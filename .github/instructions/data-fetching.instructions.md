---
description: Read this file to understand how to fetch data in the project. 
---
# Data Fetching Guidelines
This document outlines the best practices for fetching data in our Next.js application. Follow these guidelines to ensure consistency, performance, maintainability and efficiency across the codebase.

## 1. Use Server Components for Data Fetching

In Next.js, ALWAYS use Server Components for data fetching. NEVER use client components to fetch data.

## 2. Data Fetching Methods

ALWAYS use the helper functions in the the /data directory to fetch data. NEVER fetch data directly in the component.

ALL helper functions in the /data directory should use Drizzle ORM to interact with the database. 