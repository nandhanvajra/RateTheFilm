document.addEventListener('DOMContentLoaded', () => {
    const result = JSON.parse(localStorage.getItem('result'));
    const imageBaseURL = 'https://image.tmdb.org/t/p/w200';
    const details=document.querySelector(".details")
    const title=document.querySelector(".title")
    const image=document.querySelector(".image")
    const des=document.querySelector(".des")
    const date=document.querySelector(".date")
    const searchb = document.querySelector("#searchb");
    const searchres=document.querySelector('.movies');
    const home=document.querySelector('#Home')
    const rate=document.querySelector('.rate')
    const rmlist=document.querySelector('#rmlist')
    const addtolist=document.querySelector("#addtolist")
    const arr=JSON.parse(localStorage.getItem('alist')) || [];;
    const mlist=document.querySelector('#mlist');
    mlist.addEventListener("click",()=>{
        
        window.location.href='4.html'
    })
    home.addEventListener("click",()=>{
        window.location.href='index.html'
    })
    
    const apiKey = '6ba65f70f3d9fddd37a1e50799b6ea51'; 
     

    const findata = () => {
        const searchinp = document.querySelector("#msearch").value;
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchinp}&include_adult=false&language=en-US&page=1`;
        
        return fetch(url)
            .then(response => response.json());
    };
    const searchdata = () => {
        details.innerHTML=''
        findata()
            .then(res => {
                const searchinp = document.querySelector("#msearch").value;
                
                 
                
                const filteredResults = res.results.filter(result => 
                    result.original_title.toLowerCase().includes(searchinp.toLowerCase())
                );

                searchres.innerHTML=''
                filteredResults.forEach((res)=>{
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
                })


            })
            .catch(error => console.error('Error:', error));
    };
    searchb.addEventListener("click", searchdata);

    if(result){
        console.log(result)
    image.src=`${imageBaseURL}${result.poster_path}`
    image.height=450;
    image.width=350;
    title.textContent=result.original_title;
    des.textContent=result.overview
    date.textContent=result.release_date
    rate.textContent=result.vote_average
    addtolist.addEventListener("click",()=>{
        if(!arr.some((res)=>res.id===result.id)){
           
          arr.push(result)
          localStorage.setItem('alist',JSON.stringify(arr))
        }
        
    })
    rmlist.addEventListener("click",()=>{
        const temp=arr.filter((res)=>res.id!==result.id)
        localStorage.setItem('alist',JSON.stringify(temp))
    })
   
    }
    
    
});
