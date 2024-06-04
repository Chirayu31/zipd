import { z } from 'zod'
import { urlInputSchema } from '../validation/url'
import UserService from './user'
import prismaClient from '../prisma/client'

class URLService {
  public static async getShortUrlsByUser(userId: number) {
    const user = await UserService.checkUser(userId)

    if (!user) {
      throw new Error('User not found')
    }

    const urls = await prismaClient.url.findMany({
      where: {
        userId: userId,
      },
    })

    return urls
  }

  public static async checkUrlExistsForUser(url: string, userId: number) {
    const user = await UserService.checkUser(userId)

    if (!user) {
      throw new Error('User not found')
    }

    const urlRecord = await prismaClient.url.findFirst({
      where: {
        url: url,
        userId: userId,
      },
    })

    return urlRecord ? true : false
  }

  public static async checkShortUrlExists(shortUrl: string) {
    const urlRecord = await prismaClient.url.findFirst({
      where: {
        shortUrl: shortUrl,
      },
    })

    return urlRecord ? true : false
  }

  public static async createShortUrl(urlData: z.infer<typeof urlInputSchema>) {
    const { url, shortUrl, userId } = urlData
    const user = await UserService.checkUser(userId)

    if (!user) {
      throw new Error('User not found')
    }

    if (await this.checkUrlExistsForUser(url, userId)) {
      throw new Error('URL already exists')
    }

    if (shortUrl) {
      if (await this.checkShortUrlExists(shortUrl)) {
        throw new Error('Short URL already exists')
      }

      const urlRecord = await prismaClient.url.create({
        data: {
          url: url,
          shortUrl: shortUrl,
          userId: userId,
        },
      })
      return urlRecord
    }

    let generatedShortUrl = ''

    do {
      generatedShortUrl = this.generateShortUrl(url)
    } while (
      await prismaClient.url.findUnique({
        where: {
          shortUrl: generatedShortUrl,
        },
      })
    )

    const urlRecord = await prismaClient.url.create({
      data: {
        url: url,
        shortUrl: generatedShortUrl,
        userId: userId,
      },
    })

    return urlRecord
  }

  public static async deleteShortUrl(id: number) {
    const urlRecord = await prismaClient.url.findUnique({
      where: {
        id: id,
      },
    })

    if (!urlRecord) {
      throw new Error('URL not found')
    }

    await prismaClient.url.delete({
      where: {
        id: id,
      },
    })

    return true
  }

  private static generateShortUrl(url: string): string {
    const cleanedUrl = this.cleanUrl(url)
    const noVowels = cleanedUrl.replace(/[aeiouAEIOU]/g, '')
    const lettersOnly = noVowels.replace(/[^a-zA-Z]/g, '')

    console.log(lettersOnly)

    let shortUrl = lettersOnly.slice(0, 3)

    const possibleChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    while (shortUrl.length < 5) {
      const randomIndex = Math.floor(Math.random() * possibleChars.length)
      shortUrl += possibleChars[randomIndex]
    }

    return shortUrl
  }

  static cleanUrl(url: string) {
    return url.replace(
      /^(https?:\/\/)?(www\.)?|(\.com|\.net|\.org|\.io|\.edu|\.gov|\.us|\.uk|\.co|\.info|\.biz|\.name|\.me|\.tv|\.us|\.co\.uk)$/g,
      ''
    )
  }
}

export default URLService
