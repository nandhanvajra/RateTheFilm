document.addEventListener('DOMContentLoaded',()=>{
    const apiKey = '6ba65f70f3d9fddd37a1e50799b6ea51';
    const imageBaseURL = 'https://image.tmdb.org/t/p/w200';
    const arr=JSON.parse(localStorage.getItem('alist'))
    const searchb = document.querySelector("#searchb");
    const searchres=document.querySelector('.movies');
    const home=document.querySelector('#Home')
    home.addEventListener("click",()=>{
        window.location.href='index.html'
    })
    const findata = () => {
        const searchinp = document.querySelector("#msearch").value;
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchinp}&include_adult=false&language=en-US&page=1`;
        
        return fetch(url)
            .then(response => response.json());
    };

    const searchdata = () => {
        findata()
            .then(res => {
                const searchinp = document.querySelector("#msearch").value;
                
                 
                
                const filteredResults = res.results.filter(result => 
                    result.original_title.toLowerCase().includes(searchinp.toLowerCase())
                );
                localStorage.setItem('filteredResults',JSON.stringify(filteredResults));
                const queryString=`?results=${encodeURIComponent(JSON.stringify(filteredResults))}`
                window.location.href='2.html' +queryString
            })
            .catch(error => console.error('Error:', error));
    };

    searchb.addEventListener("click", searchdata);
    arr.forEach((res) => {
        
        const block=document.createElement('div');
        block.classList.add('movie');
        const poster=document.createElement('img')
        if(poster){
        poster.src=`${imageBaseURL}${res.poster_path}`
        
        }
        else{
            posterelement.src = 'https://via.placeholder.com/200x300?text=No+Image';
        }
        const link=document.createElement('button');
        link.classList.add('movietitleb')
        link.textContent=res.original_title
        poster.alt=res.original_title
        poster.height=350
        poster.width=250
        block.appendChild(poster);
        block.appendChild(link)
        searchres.appendChild(block)
        link.addEventListener("click",()=>{
            
            const data=link.id;
           localStorage.setItem('data',data)
           localStorage.setItem('result',JSON.stringify(res))
           console.log(data)
          window.location.href= '3.html';
             
        })
       
    });
    window.addEventListener('beforeunload', () => {
        arr = []; 
        localStorage.setItem('alist', JSON.stringify(arr)); 
    });
    
})