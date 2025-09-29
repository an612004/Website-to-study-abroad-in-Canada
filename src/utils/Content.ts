/* eslint-disable no-console */
import fs from 'fs';
import { join } from 'path';

import matter from 'gray-matter';

import { parseDateString } from './Common';

export const POSTS_DIRECTORY = join(process.cwd(), '_data/posts');

export const getAllCategoryIds = (): string[] => {
  try {
    const dirs = fs.readdirSync(POSTS_DIRECTORY, { withFileTypes: true });
    const catsInfo = dirs
      .filter((folder) => !folder.isFile()) // only get folder
      .map((folder) => folder.name);
    return catsInfo;
  } catch (error) {
    console.error('Error reading category directories:', error);
    return [];
  }
};

export const getCategory = (slug: string): { [key: string]: string } | null => {
  try {
    return JSON.parse(
      fs.readFileSync(join(POSTS_DIRECTORY, slug, '__info__.json'), 'utf8')
    );
  } catch {
    return null;
  }
};

// Replace lines 32-54 with:

export const getAllCategories = (): Array<{
  name: string;
  slug: string;
  [key: string]: string;
}> => {
  try {
    const dirs = fs.readdirSync(POSTS_DIRECTORY, { withFileTypes: true });
    const catsInfo = dirs
      .filter((folder) => !folder.isFile()) // only get folder
      .map((folder) => {
        try {
          const info: { [key: string]: string } = JSON.parse(
            fs.readFileSync(
              join(POSTS_DIRECTORY, folder.name, '__info__.json'),
              'utf8'
            )
          );
          // ✅ ENSURE ALL PROPERTIES ARE STRINGS
          return {
            ...info,
            name: info.name || folder.name, // ✅ Guaranteed string
            slug: folder.name, // ✅ Guaranteed string
          };
        } catch (error) {
          console.error(`Error loading category ${folder.name}:`, error);
          return {
            name: folder.name, // ✅ Guaranteed string
            slug: folder.name, // ✅ Guaranteed string
          };
        }
      });

    return catsInfo;
  } catch (error) {
    console.error('Error loading categories:', error);
    return [];
  }
};

export type IPostEditorProps = {
  listCategory: { [key: string]: string }[];
  title: string;
  description: string;
  date?: string;
  modified_date?: string;
  image?: string;
  content: string;
  slug: string;
  status?: number;
  category?: string;
};

export interface IAppConfig {
  seo: IAppConfigSEO;
  header: IAppConfigHeader;
  contact: IAppConfigContact;
  footer: IAppConfigFooter;
  navbar: IAppConfigNavbar;
  blogs: IAppConfigBlog;
}

export interface IAppConfigSEO {
  site_name: string;
  site_title: string;
  site_description: string;
  url: string;
  author: string;
}

export interface IAppConfigHeader {
  title: string;
  description: string;
}

export interface IAppConfigLink {
  name: string;
  url: string;
}

export interface IAppConfigFooter {
  links: Array<IAppConfigLink>;
}

export interface IAppConfigNavbar {
  links: string;
}

export interface IAppConfigBlog {
  slugs: Array<string>;
}

export interface IAppConfigContact {
  phone: string;
  email: string;
  address1: string;
  address2: string;
}

export function getDataConfig(): IAppConfig {
  try {
    const configDir = join(process.cwd(), '_data/config.json');
    const file = fs.readFileSync(configDir, 'utf8');
    const cfgDict = JSON.parse(file);
    return cfgDict;
  } catch (error) {
    console.error('Error loading config:', error);
    return {
      seo: {
        site_name: 'Blog',
        site_title: 'Blog',
        site_description: 'A blog website',
        url: 'https://example.com',
        author: 'Admin',
      },
      header: {
        title: 'Blog',
        description: 'Welcome to our blog',
      },
      contact: {
        phone: '',
        email: '',
        address1: '',
        address2: '',
      },
      footer: {
        links: [],
      },
      navbar: {
        links: '',
      },
      blogs: {
        slugs: [],
      },
    };
  }
}

// ✅ ADD MISSING CONSTANTS AND TYPES
const postsDirectory = join(process.cwd(), '_data/posts');

export type PostItems = {
  [key: string]: string;
};

interface IPostSlug {
  slug: string;
  category?: string;
}

// ✅ ADD MISSING getPostSlugs FUNCTION
export function getPostSlugs(category: string | null | undefined = undefined) {
  try {
    const childs = fs.readdirSync(postsDirectory, { withFileTypes: true });
    let postsFound: IPostSlug[] = [];

    childs.forEach((c) => {
      try {
        if (
          c.isFile() &&
          (category === undefined || category === null) &&
          c.name.endsWith('.md')
        ) {
          postsFound.push({ slug: c.name });
        }

        if (
          !c.isFile() &&
          (category === undefined || category === null || category === c.name)
        ) {
          const listPost = fs.readdirSync(join(postsDirectory, c.name), {
            withFileTypes: true,
          });
          listPost.forEach((p) => {
            if (p.name.endsWith('.md')) {
              postsFound.push({ category: c.name, slug: p.name });
            }
          });
        }
      } catch (error) {
        console.error(`Error reading posts in ${c.name}:`, error);
      }
    });

    postsFound = postsFound
      .filter((p) => p.slug?.endsWith('.md'))
      .map((p) => ({ ...p, slug: p.slug.replace('.md', '') }));

    return postsFound;
  } catch (error) {
    console.error('Error getting post slugs:', error);
    return [];
  }
}

// ✅ FIXED getPostBySlug WITH PROPER TYPING
export function getPostBySlug(
  slug: IPostSlug,
  fields: string[] = [],
  onlyPublished = true
) {
  const realSlug = slug.slug;
  let { category } = slug;

  let fileContents = '';
  try {
    if (!category) {
      const foundSlugs = getPostSlugs().filter(
        (p: IPostSlug) => p.slug === realSlug
      );
      if (foundSlugs.length > 0) {
        category = foundSlugs[0].category;
      }
    }

    const fullPath = category
      ? join(postsDirectory, category, `${realSlug}.md`)
      : join(postsDirectory, `${realSlug}.md`);

    fileContents = fs.readFileSync(fullPath, 'utf8');
  } catch (err) {
    return null;
  }

  try {
    // ✅ TRY-CATCH FOR YAML PARSING
    const { data, content } = matter(fileContents);

    // ✅ FIXED SANITIZED DATA WITH INDEX SIGNATURE
    interface SanitizedData {
      [key: string]: any;
      status: number;
      title: string;
      description: string;
      date: string;
      author: string;
    }

    const sanitizedData: SanitizedData = {
      ...data,
      status: data.status || 1,
      title: data.title?.toString()?.trim() || realSlug.replace(/-/g, ' '),
      description: data.description?.toString()?.trim() || '',
      date: data.date || new Date().toISOString(),
      author: data.author?.toString()?.trim() || 'Admin',
    };

    if (sanitizedData.status !== 1 && onlyPublished) return null;

    const items: PostItems = {};
    if (category) items.category = category;

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
      if (field === 'slug') {
        items[field] = realSlug;
      }
      if (field === 'content') {
        items[field] = content;
      }
      if (sanitizedData[field] !== undefined && sanitizedData[field] != null) {
        items[field] = sanitizedData[field];
      }
    });

    return items;
  } catch (yamlError) {
    // ✅ HANDLE YAML PARSING ERRORS
    console.error(
      `❌ YAML parsing error in ${realSlug}:`,
      (yamlError as Error).message
    );

    // ✅ SKIP BROKEN FILES
    if (onlyPublished) {
      return null;
    }

    // ✅ RETURN FALLBACK FOR DEVELOPMENT
    const items: PostItems = {};
    if (category) items.category = category;

    fields.forEach((field) => {
      switch (field) {
        case 'slug':
          items[field] = realSlug;
          break;
        case 'title':
          items[field] = `${realSlug.replace(/-/g, ' ')} (YAML Error)`;
          break;
        case 'description':
          items[field] = 'This post has YAML parsing errors';
          break;
        case 'content':
          items[field] = 'Content has YAML errors. Please fix front matter.';
          break;
        case 'date':
          items[field] = new Date().toISOString();
          break;
        case 'status':
          items[field] = '0';
          break;
        default:
          items[field] = '';
      }
    });

    return items;
  }
}

// ✅ ADD MISSING getPostsByCategory FUNCTION
export const getPostsByCategory = (
  category: string,
  fields: string[] = [],
  onlyPublished = true
) => {
  try {
    const slugs = getPostSlugs(category);
    return slugs
      .map((slug) => {
        try {
          return getPostBySlug(slug, fields, onlyPublished);
        } catch (error) {
          console.error(`Error loading post ${slug.slug}:`, error);
          return null;
        }
      })
      .filter((p) => p !== null)
      .sort((post1, post2) => {
        try {
          const d1 = parseDateString(post1!.date);
          const d2 = parseDateString(post2!.date);
          return d1 > d2 ? -1 : 1;
        } catch (error) {
          console.error('Error sorting posts by date:', error);
          return 0;
        }
      });
  } catch (error) {
    console.error(`Error getting posts by category ${category}:`, error);
    return [];
  }
};

// ✅ ADD MISSING getAllPosts FUNCTION
export function getAllPosts(fields: string[] = [], onlyPublished = true) {
  try {
    const slugs = getPostSlugs();
    const posts = slugs
      .map((slug) => {
        try {
          return getPostBySlug(slug, fields, onlyPublished);
        } catch (error) {
          console.error(`Error loading post ${slug.slug}:`, error);
          return null;
        }
      })
      .filter((p) => p !== null)
      .sort((post1, post2) => {
        try {
          const d1 = parseDateString(post1!.date);
          const d2 = parseDateString(post2!.date);
          return d1 > d2 ? -1 : 1;
        } catch (error) {
          console.error('Error sorting posts by date:', error);
          return 0;
        }
      });
    return posts;
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
}
