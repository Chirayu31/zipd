import { z } from 'zod'
import { urlInputSchema } from '../../validation/url'
import URLService from '../../services/url'

const mutations = {
  createShortUrl: async (
    _: any,
    data: { url: z.infer<typeof urlInputSchema> }
  ) => {
    const res = await URLService.createShortUrl(data.url)
    return res.shortUrl
  },

  deleteShortUrl: async (_: any, data: { id: number }) => {
    const res = await URLService.deleteShortUrl(data.id)
    return res
  },
}

const queries = {}

export const resolvers = { mutations, queries }
