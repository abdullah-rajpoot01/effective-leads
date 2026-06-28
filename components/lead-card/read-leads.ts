// utils/readLeads.ts
import { Lead } from '@/types/lead';
import fs from 'fs';
import path from 'path';

/**
 * Reads all lead JSON files from the specified directory and returns an array of leads
 * @param leadsDirectory - Path to the directory containing lead JSON files (default: 'content/leads')
 * @returns Promise<Lead[]> - Array of leads with slugs set to filenames (without .json extension)
 */
export async function readAllLeads(leadsDirectory: string = 'content/leads'): Promise<Lead[]> {
  try {
    // Get the absolute path relative to the project root
    const absolutePath = path.join(process.cwd(), leadsDirectory);

    // Check if directory exists
    if (!fs.existsSync(absolutePath)) {
      console.error(`Directory not found: ${absolutePath}`);
      console.log('Current working directory:', process.cwd());
      return [];
    }

    // Read all files from the directory
    const files = fs.readdirSync(absolutePath);

    // Filter for JSON files only
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    if (jsonFiles.length === 0) {
      console.warn(`No JSON files found in directory: ${absolutePath}`);
      return [];
    }

    // Read and parse each JSON file
    const leads: Lead[] = [];

    for (const file of jsonFiles) {
      try {
        const filePath = path.join(absolutePath, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const leadData = JSON.parse(fileContent) as Omit<Lead, 'slug'>;

        // Create lead object with slug from filename
        const lead: Lead = {
          ...leadData,
        };

        // Validate required fields
        if (!lead.name || !lead.mobiles.length || !lead.status || !lead.conversationChannel || !lead.priority) {
          console.warn(`Lead in file ${file} is missing required fields`);
        }

        leads.push(lead);
      } catch (error) {
        console.error(`Error reading file ${file}:`, error);
        // Continue with other files even if one fails
      }
    }

    return leads;
  } catch (error) {
    console.error('Error reading leads directory:', error);
    throw error;
  }
}

