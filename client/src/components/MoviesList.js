import React, { Component } from 'react';
import { SearchBox, Hits, NoHits, Pagination, MenuFilter, DynamicRangeFilter, PageSizeSelector, SortingSelector, InitialLoader, Select, Toggle, SearchkitComponent, SearchkitManager, SearchkitProvider, HitItemProps } from "searchkit";
import MovieHitsTable from './MoviesList/MovieHitsTable';

const InitialLoaderComponent = (props) => (
    <div>
      loading please wait...
    </div>
  )
  
class MoviesList extends Component {   
    
    render() {
        const searchkit = new SearchkitManager("http://192.168.99.100:9200");
        return (
                <SearchkitProvider searchkit={searchkit}>
                    <div className="sk">
                        <SearchBox
                            searchOnChange={true}
                            queryOptions={{analyzer:"standard"}}
                            queryFields={["title"]}
                            autofocus={true}
                            placeholder="search movies"
                        />
                        <InitialLoader component={InitialLoaderComponent}/>
                        <MenuFilter
                            field="title.raw"
                            title="title"
                            id="title"
                        />
                        <DynamicRangeFilter field="rating" id="metascore" title="Rating"/>
                        <PageSizeSelector 
                            options={[15,30,50]} 
                            listComponent={Select}
                        />
                        <SortingSelector options={[
                            {label:"Relevance", field:"rating", order:"desc", defaultOption:true},
                            {label:"Latest Releases", field:"year", order:"desc"},
                            {label:"Earliest Releases", field:"year", order:"asc", key:"earliest"}
                        ]}/>
                        <Hits 
                            hitsPerPage={15} 
                            highlightFields={["rating"]} 
                            sourceFilter={["title", "large_cover_image", "rating", "year"]} 
                            listComponent={MovieHitsTable} 
                            mod="sk-hits-list"
                        />
                        <NoHits 
                            suggestionsField="title"
                        />
                        <Pagination 
                            showNumbers={true}
                            mod=""
                        />
                    </div>
                </SearchkitProvider>
        );
    }
}

export default MoviesList;