export const mutations = `#graphql

    createShortUrl(url: ShortUrlInput!): ID!
    deleteShortUrl(id: Int!): Boolean!
`
