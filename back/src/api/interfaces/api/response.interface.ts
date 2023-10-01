export interface response<dataInterface> {
  status: number;
  message: string;
  data?: dataInterface;
}
