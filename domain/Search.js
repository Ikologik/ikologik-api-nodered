
class SearchFilter{
    constructor(field, type, values) {
        this.field = field;
        this.type = type;
        this.values = values;
    }
}

class SearchOrder{
    constructor(field, type) {
        this.field = field;
        this.type = type;
    }
}

class SearchPagination{
    constructor(page=0, size=50 ) {
        this.page = page;
        this.size = size;
    }
}

export default class Search{
    constructor() {
        this.filter = {};
        this.order = {};
        this.pagination = new SearchPagination();
    }

    addFilter(filter_field, filter_type, filter_values){
        this.filter.append(
            new SearchFilter(
                filter_field,
                filter_type,
                filter_values,
            )
        )
    }

    addMultipleFilters(filter){
        for (const item in filter) {
            this.filter.append(
                new SearchFilter(
                    item[0],
                    item[1],
                    item[2]
                )
            )
        }
    }

    addOrder(order_field, order_type){
        this.order.append(
            new SearchOrder(
                order_field,
                order_type
            )
        )
    }

    setPagination(page =0, size =50){
        this.pagination = new SearchPagination( page, size);
    }
}