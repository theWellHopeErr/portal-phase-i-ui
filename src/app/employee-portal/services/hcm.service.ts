import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeaveReq } from '../leave-request/LeaveReq';

@Injectable({
  providedIn: 'root',
})
export class HcmService {
  constructor(private http: HttpClient) {}

  getLeaveData() {
    return this.http.get(`api/employee/leave-data`);
  }

  createLeaveRequest(leave_req: LeaveReq) {
    return this.http.post('api/employee/leave-req', leave_req);
  }

  getPaySlipList() {
    return this.http.get(`api/employee/ps`);
  }

  getPaySlipDetails(seq_no) {
    return this.http.get(`api/employee/ps-details?sn=${seq_no}`);
  }

  checkNoticeStatus() {
    return this.http.put(`api/employee/notice`, { option: 'status' });
  }

  requestNotice() {
    return this.http.put(`api/employee/notice`, { option: 'request' });
  }

  cancelNotice() {
    return this.http.put(`api/employee/notice`, { option: 'cancel' });
  }

  getFinalSettlement() {
    return this.http.get(`api/employee/final-set`);
  }
}
