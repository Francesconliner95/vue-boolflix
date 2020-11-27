var app = new Vue({
    el: '#root',
    data: {
        search_text: '',
        word: '',
        research_in_progress: false,
        search_array: [],
        flags_array:['en', 'it', 'jp', 'es', 'fr'],
        actors: [],
        categories: 'All Categories',
        genre_list: [],
        genre: [],
        isOver: false,
        },
    methods: {
        search_enter(){
            this.search();
        },

        auto_select_refresh(){
            if (this.search_text=='') {
                this.search_text = this.word;
            }
            else{
                this.search_text = '';
            }
            this.search();
        },

        home_reset(){
            this.search_text = '';
            this.word = '';
            this.search_array=[];
        },

        search(){
            switch(this.categories) {
              case 'All Categories':
                this.searchMovies_TvShow();
                break;
              case 'TVshow':
                this.searchTvShow();
                break;
              case 'Movie':
                this.searchMovies();
                break;
              default:
                this.searchMovies_TvShow();
            }
        },

        searchMovies_TvShow(){
            if(app.search_text.trim()!=''){
                app.research_in_progress=true;
                app.search_array=[];
                this.getMovies();
                this.getSeries();
                app.word=app.search_text;
                app.search_text= '';
                console.log(app.search_array);
            }
        },

        searchMovies(){
            if(app.search_text.trim()!=''){
                app.research_in_progress=true;
                app.search_array=[];
                this.getMovies();
                app.word=app.search_text;
                app.search_text= '';
            }
        },

        searchTvShow(){
            if(app.search_text.trim()!=''){
                app.research_in_progress=true;
                app.search_array=[];
                this.getSeries();
                app.word=app.search_text;
                app.search_text= '';
            }
        },

        getMovies(){
            axios.get('https://api.themoviedb.org/3/search/movie',{
                params:{
                    api_key: '4a1844d0c1312fb56c1a5f50c104b224',
                    query: app.search_text,
                }
            }
        ).then(function(risposta) {
            app.search_array.push(...risposta.data.results);
            app.research_in_progress=false;
            });
        },

        getSeries(){
            axios.get('https://api.themoviedb.org/3/search/tv',{
                   params:{
                       api_key: '4a1844d0c1312fb56c1a5f50c104b224',
                       query: app.search_text,
                   }
               }
           ).then(function(risposta2) {
               app.search_array.push(...risposta2.data.results);
               app.research_in_progress=false;
               });
        },

        mouseOver(index){
            var category='movie';
            if (!app.isOver) {
                app.isOver=true;
                if(app.search_array[index].title!=undefined){
                    category='tv';
                }
                axios.get('https://api.themoviedb.org/3/'+ category +'/'+ app.search_array[index].id +'/credits',{
                           params:{
                               api_key: '4a1844d0c1312fb56c1a5f50c104b224',
                           }
                       }
                    ).then(function(actors) {
                        app.actors=actors.data.cast.slice(0, 5);
                    });
                // app.search_array[index].genre_ids[]
                app.genre=[];
                for (var i = 0; i < app.search_array[index].genre_ids.length; i++) {
                    for (var j = 0; j < app.genre_list.length; j++) {
                        if(app.search_array[index].genre_ids[i]==app.genre_list[j].id){
                            if(!app.genre.includes(app.genre_list[j].name)){
                                app.genre.push(app.genre_list[j].name);
                            }
                        }
                    }

                }
                console.log(app.genre);
                console.log('tipo:' + category);
            }
        },

        mouseLeave(){
            app.isOver=false;
        }

    },

    mounted: function(){
        axios.get('https://api.themoviedb.org/3/genre/movie/list',{
                   params:{
                       api_key: '4a1844d0c1312fb56c1a5f50c104b224',
                   }
               }
           ).then(function(genMovie) {
                app.genre_list.push(...genMovie.data.genres);
            });

        axios.get('https://api.themoviedb.org/3/genre/tv/list',{
                   params:{
                       api_key: '4a1844d0c1312fb56c1a5f50c104b224',
                   }
               }
           ).then(function(genTV) {
                app.genre_list.push(...genTV.data.genres);
                console.log(app.genre_list);
            });

    },

})
