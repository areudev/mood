import {OpenAI} from 'langchain/llms/openai'
import {
  OutputFixingParser,
  StructuredOutputParser,
} from 'langchain/output_parsers'
import {PromptTemplate} from 'langchain/prompts'
import z from 'zod'
import {Document} from 'langchain/document'
import {loadQARefineChain} from 'langchain/chains'
import {OpenAIEmbeddings} from 'langchain/embeddings/openai'
import {MemoryVectorStore} from 'langchain/vectorstores/memory'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry.'),
    subject: z.string().describe('the subject of the journal entry.'),
    negative: z
      .boolean()
      .describe(
        'is the journal entry negative? (i.e. does it contain negative emotions?).',
      ),
    summary: z.string().describe('quick summary of the entire entry.'),
    color: z
      .string()
      .describe(
        'a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness. change the color to much the mood of the entry.',
      ),
    sentimentScore: z
      .number()
      .describe(
        'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.',
      ),
  }),
)

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions()
  console.log('format_instructions', format_instructions)

  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the intrusctions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: {format_instructions},
  })
  console.log('prompt', prompt)

  const input = await prompt.format({
    entry: content,
  })

  return input
}

export const analyzeEntry = async (content: string) => {
  const input = await getPrompt(content)
  const model = new OpenAI({temperature: 0, modelName: 'gpt-3.5-turbo'})
  const output = await model.call(input)
  try {
    return parser.parse(output)
  } catch (e) {
    const fixParser = OutputFixingParser.fromLLM(
      new OpenAI({temperature: 0, modelName: 'gpt-3.5-turbo'}),
      parser,
    )
    const fix = await fixParser.parse(output)
    return fix
  }
}

export const qa = async (question: string, entries: Entry[]) => {
  const docs = entries.map(entry => {
    return new Document({
      pageContent: entry.content,
      metadata: {
        source: entry.id,
        date: entry.createdAt,
      },
    })
  })
  const model = new OpenAI({temperature: 0, modelName: 'gpt-3.5-turbo'})
  const chain = loadQARefineChain(model)
  const embeddings = new OpenAIEmbeddings()
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
  const relevantDocs = await store.similaritySearch(question)
  const res = await chain.call({
    input_documents: relevantDocs,
    question,
  })

  return res.output_text
}
