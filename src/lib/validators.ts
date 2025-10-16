// Mock validators
export const presetCreateSchema = {
  parse: (data: any) => data
};

export const presetUpdateSchema = {
  parse: (data: any) => data
};

export const labelsGenerateSchema = {
  parse: (data: any) => data
};

export const parcelCreateSchema = {
  parse: (data: any) => data
};

export const parcelUpdateSchema = {
  parse: (data: any) => data
};

export const parcelMoveSchema = {
  parse: (data: any) => data
};

export const parcelsBulkCreateSchema = {
  parse: (data: any) => data
};

// Mock service class
export class PackingService {
  static async createPreset(data: any): Promise<any> {
    return { id: 'preset-1', ...data };
  }
  
  static async updatePreset(id: string, data: any): Promise<any> {
    return { id, ...data };
  }
  
  static async deletePreset(id: string): Promise<any> {
    return { id, deleted: true };
  }
}
