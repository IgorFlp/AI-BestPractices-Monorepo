import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// Initialize the Angular test environment
TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  {
    teardown: { destroyAfterEach: true },
  }
);

// Mock fetch for resource loading (CSS, HTML templates)
const originalFetch = globalThis.fetch;
globalThis.fetch = (url: string | Request | URL, init?: RequestInit) => {
  if (typeof url === 'string' && (url.endsWith('.css') || url.endsWith('.html'))) {
    return Promise.resolve(new Response('', { status: 200 }));
  }
  return originalFetch(url, init);
};

