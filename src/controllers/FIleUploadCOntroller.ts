import { Router, Response } from 'express';
import { uploadMiddleware } from '../services/FileUploadService.js';
import { SalesDataUploadService } from '../services/SalesDataUploadService.js';
import {AuthenticatedRequest, authenticateJWT } from '../utils/middlewares/authenticateJWT.js';

export class FileUploadController {
  public router: Router;
  private salesDataUploadService: SalesDataUploadService;

  constructor() {
    this.router = Router();
    this.salesDataUploadService = new SalesDataUploadService();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/', authenticateJWT, uploadMiddleware.single('file'), this.handleUpload.bind(this));
    this.router.get('/:fileName', authenticateJWT, this.getFileData.bind(this)); 

  }

  async handleUpload(req: AuthenticatedRequest, res: Response) {
    const result = await this.salesDataUploadService.upload(req);
    res.status(201).json(result); 
  }

  async getFileData(req: AuthenticatedRequest, res: Response) {
    const userId = req.user!.id;
    const fileName = req.params.fileName;
    const data = await this.salesDataUploadService.getDataByFileName(userId, fileName);
    res.status(200).json(data);
}
}