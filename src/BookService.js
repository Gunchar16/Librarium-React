import librariumApi from './librariumApi';

export async function BooksGetAll () {
    return await librariumApi.get('/book').then(res => {
      return res.data;
    });
  }

  export async function BookGet (id) {
    return await librariumApi.get(`/book/${id}`).then(res => {
      return res.data;
    });
  }

  export async function BookSearch (text) {
    return await librariumApi.get(`/book/search`, {
      params:{
        text: text
    }
  }).then(res => {
      return res.data;
    });
  }


  export async function AuthorizeUser(user) {
    return await librariumApi.post(`/auth/login`, user).then(res => {
      return res.data;
    });
  }

  export async function BookDelete(id) {
    return await librariumApi.delete(`/book/${id}`).then(res => {
      return res.data;
    });
  }
  