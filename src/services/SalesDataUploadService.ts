import { FileParserService } from './FileParserService.js';
import { PrismaSalesDataRepository } from '../dao/PrismaSalesDataRepository.js';
import { UploadResultDTO } from '../dtos/UploadResultDTO.js';
import { AuthenticatedRequest } from '../utils/middlewares/authenticateJWT.js';
import { BadRequestException } from '../utils/exceptions/BadRequestException.js';
import { SalesDataResponseDTO } from '../dtos/SalesDataResponse.js';

export class SalesDataUploadService {
  private fileParserService: FileParserService;
  private salesDataRepository: PrismaSalesDataRepository;

  constructor() {
    this.fileParserService = new FileParserService();
    this.salesDataRepository = new PrismaSalesDataRepository();
  }

  public async upload(req: AuthenticatedRequest): Promise<UploadResultDTO> {

    if (!req.file) throw new BadRequestException('No file uploaded');
    

    const userId = req.user!.id;

    // 1. Parsear y validar el archivo
    const salesData = this.fileParserService.parse(req.file.path);

    // 2. Orquestar la lógica de versionado
    const latestVersion = await this.salesDataRepository.getLatestVersion(userId, req.file.originalname);
    const newVersion = latestVersion + 1;

    // 3. Guardar en la base de datos con la nueva versión
    await this.salesDataRepository.saveMany(salesData, userId, req.file.originalname, newVersion);

    // 4. Devolver un DTO con el resultado
    return {
      message: 'File uploaded and processed successfully',
      fileId: req.file.originalname,
      dataUrl: `/sales-data/${req.file.originalname}`,
      recordsProcessed: salesData.length,
    };
  }

  public async getDataByFileName(userId: number, fileName: string) {
   const rawData = await this.salesDataRepository.findByFileName(userId, fileName);

  return rawData.map(
    (item) =>
      new SalesDataResponseDTO({
        sku: item.sku,
        date: item.fecha,
        quantity: item.cantidad_vendida,
        price: item.precio,
        promotion: item.promocion_activa,
        category: item.categoria,
      })
  );
  }

}
