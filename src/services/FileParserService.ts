import * as fs from 'fs';
import * as path from 'path';
import * as xlsx from 'xlsx';
import { parse as csvParse } from 'csv-parse/sync';
import { SalesData } from '../domain/SalesData.js';
import { BadRequestException } from '../utils/exceptions/BadRequestException.js';

export class FileParserService {
  public parse(filePath: string): SalesData[] {
    const extension = path.extname(filePath).toLowerCase();
    let rawData: any[];

    if (extension === '.csv') {
      const fileContent = fs.readFileSync(filePath);
      rawData = csvParse(fileContent, { columns: true, skip_empty_lines: true });
    } else if (['.xls', '.xlsx'].includes(extension)) {
      const fileBuffer = fs.readFileSync(filePath);
      const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      rawData = xlsx.utils.sheet_to_json(sheet, { defval: '' });
    } else {
      throw new BadRequestException('Unsupported file type');
    }

    return rawData.map((row, i) => SalesData.create(row, i + 2));
  }
}
