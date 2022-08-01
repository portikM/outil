/* eslint-disable @typescript-eslint/no-var-requires */
import { Handler, Context } from 'aws-lambda';
import { Server } from 'http';
import { createServer } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';

import { INestApplication } from '@nestjs/common';

import { ClearStorageService } from './clear-storage/clear-storage.service';
import { QueueMessage } from './infrastructure/queue/interfaces/queue-message.interface';

const express = require('express');

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below
const binaryMimeTypes: string[] = [];

let cachedServer: Server;
let nestApp: INestApplication;

async function bootstrapServer(): Promise<Server> {
  if (!cachedServer) {
    const expressApp = express();
    nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );
    nestApp.use(eventContext());
    await nestApp.init();
    cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
  }
  return cachedServer;
}

export const handler: Handler = async (event: any, context: Context) => {
  cachedServer = await bootstrapServer();
  const clearStorageService = nestApp.get(ClearStorageService);

  for (const record of event.Records) {
    const staleObjects: QueueMessage = record.body
      ? JSON.parse(record.body)
      : {};
    await clearStorageService.deleteStaleObjects(staleObjects);
  }
};
