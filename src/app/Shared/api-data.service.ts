import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  sharedData :any; 
  private isSidebarOpen = new BehaviorSubject<boolean>(false);
  private chatGpt = 'https://api.openai.com/v1/chat/completions'; 
  //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
  // private chatGptKey ='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';
  private chatGptKey ='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';
// readonly apiUrl = 'http://localhost:50151/api/Data/';
 readonly apiUrl = "https://daredevilmediainc.com/api/Data/"
//  readonly apiUrl = 'https://backend.metamax.ai/api/Data/';

constructor(private http: HttpClient) { }

setData(data: any): void {
  this.sharedData = data;
}

getData(): any {
  return this.sharedData;
}

 Login(data:any){
     return this.http.post<any>(this.apiUrl+'Loginv1',data);
  }

  ForgotPassword(data:any){
    return this.http.post<any>(this.apiUrl+'ForgotPassword',data);
  }

 Register(data:any){
    return this.http.post<any>(this.apiUrl+'Register',data);
 }

 RequestOTP(email: any) {
  return this.http.get<any>(this.apiUrl + 'RequestOTP?form='+email);
}

AdminGetCustomer(data:any){
  return this.http.get<any>(this.apiUrl+'GetCustomer?accesskey='+data);
}

AdminDeleteCustomer(data:any, id:any)
{
  return this.http.get<any>(this.apiUrl+'DeleteCustomer?accesskey='+data+'&id='+id);
}

AdminCategory(data:any){
  return this.http.post<any>(this.apiUrl+'AdminCategory',data);
}

GetCategory(data:any){
return this.http.get<any>(this.apiUrl+'GetCategory?accesskey='+data);
}

DeleteCategory(data:any, id:any)
{
  return this.http.get<any>(this.apiUrl+'DeleteCategory?accesskey='+data+'&id='+id);
}

// SaveImage(data:any){
//   return this.http.post<any>(this.apiUrl+'savephoto',data);
// }

SaveImage(formData: any): Observable<HttpEvent<any>> {
  const request = new HttpRequest('POST', `${this.apiUrl}savephoto`, formData, {
    reportProgress: true,
    // You can set other headers as needed, e.g., Authorization header
  });

  return this.http.request(request);
}

  SaveVideo(formData: FormData): Observable<HttpEvent<any>> {
    const request = new HttpRequest('POST', `${this.apiUrl}savephoto`, formData, {
      reportProgress: true,
      // You can set other headers as needed, e.g., Authorization header
    });

    return this.http.request(request);
  }

  
  SaveCourse(data:any){
    return this.http.post<any>(this.apiUrl+'SaveCourse',data);
    }
    UpdateCourse(data:any){
      return this.http.put<any>(this.apiUrl+'UpdateCourse',data);
      }
    GetCourse(data:any){
      return this.http.get<any>(this.apiUrl+'GetCourse?accesskey='+data);
      }
      
      DeleteCourse(data:any, id:any)
      {
        return this.http.get<any>(this.apiUrl+'DeleteCourse?accesskey='+data+'&id='+id);
      }
      GetCourseByCategory(accesskey:any, id:any){
        return this.http.get<any>(this.apiUrl+'GetCourseByCategory?accesskey='+accesskey+'&category='+id);
      }   
      GetInfor(data:any){
        return this.http.get<any>(this.apiUrl+'GetInfor?accesskey='+data);
      }
  
      SearchBycategory(accesskey:any,data:any){
        return this.http.get<any>(this.apiUrl+'SearchBycategory?accesskey='+accesskey+'&data='+data);
      }

      PostClassHistory(data:any){
        return this.http.post<any>(this.apiUrl+'PostClassHistory',data);
      }
      ClassHistory(data:any){
        return this.http.get<any>(this.apiUrl+'ClassHistory?accesskey='+data);
      }

      PaymentByStripe(data:any){
        return this.http.post<any>(this.apiUrl+'StripeCharge2',data);
      }
      
      PayTable (accesskey:any,plan:any, token:any){
        return this.http.get<any>(this.apiUrl+'PayTable?accesskey='+accesskey+'&plan='+plan+'&token='+token);
      }

      Tolerance()
      {
        return this.http.get<any>(this.apiUrl+'/Tolerance');
      }

      CheckPayment(data:any){
        return this.http.get<any>(this.apiUrl+'/CheckPayment?accesskey='+data);
      }

      
      generateCompletion(userMessage: string): Observable<any> {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        });
    
        const requestData = {
          model: 'gpt-3.5-turbo',
          messages: [          
            { role: 'user', content: userMessage }
          ]
        };
    
        return this.http.post(this.chatGpt, requestData, { headers });
      }
 
      AdminDashboard(accesskey:any){
        return this.http.get<any>(this.apiUrl+'AdminDashboard?accesskey='+accesskey);
      }

      GetCustomersInfor(accesskey:any){
        return this.http.get<any>(this.apiUrl+'GetCustomersInfor?accesskey='+accesskey);
      }

      getPay(){
        return this.http.get<any>(this.apiUrl+'getPay');
      }
      
      GetCourse2(data:any,days:any){
        return this.http.get<any>(this.apiUrl+'GetCourse2?accesskey='+data+'&days='+days);
        }

        EndSession(data:any){
          return this.http.post<any>(this.apiUrl+'EndSession',data);
        }

        GetCoursesByCat(data:any){
          return this.http.get<any>(this.apiUrl+'GetCoursesByCat?data='+data);

        }
        GetCoursesByID(data:any){
          return this.http.get<any>(this.apiUrl+'GetCoursesByID?data='+data);   
        }

        loadScript(scriptUrl: string): Promise<void> {
          return new Promise<void>((resolve, reject) => {
            const scriptElement = document.createElement('script');
            scriptElement.src = scriptUrl;
            scriptElement.onload = () => resolve();
            scriptElement.onerror = (error) => reject(error);
            document.body.appendChild(scriptElement);
          });
        }

        private isSidebarOpenSubject = new BehaviorSubject<boolean>(false);
        isSidebarOpen$ = this.isSidebarOpenSubject.asObservable();
      
        toggleSidebar(): void {
          this.isSidebarOpenSubject.next(!this.isSidebarOpenSubject.value);
        }
  }
