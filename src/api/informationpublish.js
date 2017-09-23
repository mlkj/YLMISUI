import fetch from  './fetch';
import Qs from 'qs';


//InformationPublish
 export const requestGetInformationPublishPageList=params=>{
        return fetch({ 
            url: '/api/services/app/informationPublish/GetInformationPublishPageList',
            method: 'post',
            data: params
        })
    };
 export const requestCreateOrUpdateInformationPublish=params=>{
        return fetch({ 
            url: '/api/services/app/informationPublish/CreateOrUpdateInformationPublish',
            method: 'post',
            data: params
        })
    };
export const requestDeleteInformationPublish=params=>{
    return fetch({ 
        url: '/api/services/app/informationPublish/DeleteInformationPublish',
        method: 'post',
        data: params
    })
   };
