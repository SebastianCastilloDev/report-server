import {
  Get,
  Injectable,
  NotFoundException,
  OnModuleInit,
  Res,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import {
  getEmploymentLetterByIdReport,
  getEmploymentLetterReport,
  getHelloWorldReport,
} from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    console.log('Connected to the database');
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  hello() {
    const docDefinition = getHelloWorldReport({ name: 'Sebastian' });

    const pdfDoc = this.printerService.createPdf(docDefinition, {});

    return pdfDoc;
  }

  employmentLetter(): PDFKit.PDFDocument {
    const docDefinition = getEmploymentLetterReport();

    const pdfDoc = this.printerService.createPdf(docDefinition, {});

    return pdfDoc;
  }

  async employmentLetterById(employeeId: number): Promise<PDFKit.PDFDocument> {
    const employee = await this.employees.findUnique({
      where: {
        id: employeeId,
      },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    const docDefinition = getEmploymentLetterByIdReport({
      employerName: 'Sebastian',
      employerPosition: 'Software Developer',
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeHours: employee.hours_per_day,
      employeeWorkSchedule: employee.work_schedule,
      employerCompany: 'Tucan Code',
    });

    const pdfDoc = this.printerService.createPdf(docDefinition, {});

    return pdfDoc;
  }
}
