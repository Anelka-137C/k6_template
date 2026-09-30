import { SharedArray } from "k6/data";
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

export default class Utils {
    /**
     * @param filename - The name of the CSV file to read.
     * @returns An array of rows representing the CSV data.
     */
    static readCsv<T = any[]>(filename: string): T[] {
        const filePath = `../../resources/csv/${filename}`;
        try {
            const retorno = new SharedArray<T>(filename, function () {
                const fileContent = open(filePath);
                const data = papaparse.parse<T>(fileContent, {
                    header: false,
                }).data;
                return data;
            });
            return retorno;
        } catch (error: any) {
            console.error(`Error reading CSV file: ${filePath}. Error: ${error?.message ?? error}`);
            throw error;
        }
    }

    /**
     * @param filename - The name of the TXT file to read.
     * @returns An array of strings representing the lines of the TXT file.
     */
    static readTxt(filename: string): string[] {
        const filePath = `../../resources/txt/${filename}`;
        try {
            const retorno = new SharedArray<string>(filename, function () {
                const fileContent = open(filePath);
                return fileContent.split('\n').map((line: string) => line.trim()).filter((line: string) => line !== '');
            });
            return retorno;
        } catch (error: any) {
            console.error(`Error reading TXT file: ${filePath}. Error: ${error?.message ?? error}`);
            throw error;
        }
    }
}
