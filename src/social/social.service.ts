import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SocialService {
  private cache: any = null;
  private cacheTimestamp = 0;
  private readonly CACHE_TTL = 1000 * 60 * 5; // 5 Minuten Cache
  private readonly logger = new Logger(SocialService.name);

  constructor(private http: HttpService) {}

  async getInstagramFeed() {
    const now = Date.now();

    // Cache nutzen, falls jünger als TTL
    if (this.cache && now - this.cacheTimestamp < this.CACHE_TTL) {
      return this.cache;
    }

    try {
      const token = process.env.INSTAGRAM_ACCESS_TOKEN;
      const userId = process.env.INSTAGRAM_USER_ID;

      const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,permalink,timestamp,thumbnail_url&access_token=${token}`;

      const response = await firstValueFrom(this.http.get(url));
      this.cache = response.data;
      this.cacheTimestamp = now;

      return this.cache;
    } catch (err) {
      this.logger.error('Fehler beim Laden des Instagram-Feeds', err);
      return { error: 'Instagram-Feed aktuell nicht verfügbar' };
    }
  }
}
