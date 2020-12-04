import { Search, SearchCategory } from './Search';
import { PrimaryFacet } from './PrimaryFacet';

export class SearchResponse {
    categories: SearchCategory[];
    searchResult: Search[];
    count: number;
    maxPrice: number;
    minPrice: number;
    primaryFacets: PrimaryFacet[];
}