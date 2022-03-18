import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'colorPipe' })
export class ColorPipe implements PipeTransform {
  transform(value: number): string {
    if (value === 1) return 'レッド';
    else if (value === 2) return 'ブルー';
    else if (value === 3) return 'グリーン';
    else if (value === 4) return 'イエロー';
    else if (value === 5) return 'ピンク';
    else return 'なし';
  }
}
