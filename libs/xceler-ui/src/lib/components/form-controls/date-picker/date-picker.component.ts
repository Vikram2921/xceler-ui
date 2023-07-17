import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {BaseFormControl} from "../core/base-form-control";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'xui-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ]
})
export class DatePickerComponent extends BaseFormControl implements OnInit{

  @Input() format: string = 'dd MMMM yyyy';
  datePipe = new DatePipe('en-US');
  showCalendar: boolean = false;
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  currentMonth!: Date;
  text!:string | null;
  @Input() placeholder: string = 'Select Date';
  ngOnInit() {
    this.currentMonth = new Date();
    this.updateView();
  }

  private updateView(): void {
    if(this.value) {
      this.text = this.datePipe.transform(this.value,this.format);
    }
  }

  getCurrentMonth(): string {
    const options:any = { month: 'long' };
    return this.currentMonth.toLocaleDateString(undefined, options);
  }

  getCurrentYear(): string {
    const options:any = {  year: 'numeric' };
    return this.currentMonth.toLocaleDateString(undefined, options);
  }

  previousMonth(): void {
    this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
  }

  nextMonth(): void {
    this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
  }

  selectDate(date: Date | null): void {
    this.value = date;
    this.updateView();
    this.showCalendar = false;
  }

  get visibleDays(): {date:Date,weekNumber:number}[] {
    const firstDayOfMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
    const lastDayOfMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);

    const daysInMonth = lastDayOfMonth.getDate();
    const prevMonthDays = firstDayOfMonth.getDay();
    const visibleDays = [];
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      const prevMonthDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), -i);
      visibleDays.push({ date: prevMonthDate, weekNumber: this.getWeekNumber(prevMonthDate) });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), i);
      visibleDays.push({ date: currentDate, weekNumber: this.getWeekNumber(currentDate) });
    }
    const nextMonthDays = 6 - lastDayOfMonth.getDay();
    for (let i = 1; i <= nextMonthDays; i++) {
      const nextMonthDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, i);
      visibleDays.push({ date: nextMonthDate, weekNumber: this.getWeekNumber(nextMonthDate) });
    }
    return visibleDays;
  }

  private getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const dayDiff = Math.round((date.getTime() - firstDayOfYear.getTime()) / (1000 * 3600 * 24));
    return Math.ceil((firstDayOfYear.getDay() + 1 + dayDiff) / 7);
  }

  writeValue(obj: any): void {
    this.value = obj;
    if(obj) {
      this.updateView();
    }
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

  convertToDate(text: string | null) {
    if(text == null) {
      return null;
    }
    return new Date(text);
  }
}
