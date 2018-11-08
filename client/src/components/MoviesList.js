import React, { Component } from 'react';
// import movie from '../assets/img/movie-poster.jpg';
import { SearchBox, SideBar, LayoutResults, RangeFilter, ActionBar, Hits, NoHits, Pagination, MenuFilter, DynamicRangeFilter, PageSizeSelector, SortingSelector, InitialLoader, Select, Toggle, SearchkitComponent, SearchkitManager, SearchkitProvider, HitItemProps } from "searchkit";
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
                        <PageSizeSelector 
                            options={[15,30,50]} 
                            listComponent={Select}
                        />
                        
                        <div className="sk-filter">
                            <div className="sk-filter--sort">
                            <SideBar>
                                <InitialLoader component={InitialLoaderComponent}/>
                                <div className="sk-filter--sort-range">
                                    <div className="sk-filter--sort-range-1">
                                        {/* <MenuFilter
                                            field="title.raw"
                                            title="Movies"
                                            id="title"
                                        /> */}
                                        <DynamicRangeFilter 
                                            field="year" 
                                            id="metascore" 
                                            title="Years"
                                            rangeFormatter={(count) => Math.round(count)} 
                                        />
                                    </div>
                                    <div className="sk-filter--sort-range-2">
                                        <DynamicRangeFilter 
                                            field="year" 
                                            id="metascore" 
                                            title="Years"
                                            rangeFormatter={(count) => Math.round(count)} 
                                        />
                                    </div>
                                </div>
                            </SideBar>
                            {/* <LayoutResults> */}
                                <ActionBar>
                                    <SortingSelector options={[
                                        {label:"Relevance", field:"rating", order:"desc", defaultOption:true},
                                        {label:"Latest Releases", field:"year", order:"desc"},
                                        {label:"Earliest Releases", field:"year", order:"asc", key:"earliest"}
                                    ]}
                                    listComponent={Toggle}
                                    />
                                </ActionBar>
                            {/* </LayoutResults> */}
                            </div>
                            <div className="sk-filter--hit">
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
                                />
                            </div>
                        </div>
                    </div>
                </SearchkitProvider>
        );
    }
}

export default MoviesList;