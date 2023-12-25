export default function getFilterQuery(query) {
    let filterQuery = ''
    let countFilterQuery = ''

    if (query?.info) {
        filterQuery += `&filters[$or][0][username][$contains]=${query.info}&filters[$or][1][nickname][$contains]=${query.info}&filters[$or][2][phone][$contains]=${query.info}`
        countFilterQuery += `username[$contains]=${query.info}`
    }
    if (query?.group) {
        filterQuery += `&filters[$and][3][group]=${query.group}`
    }
    if (query?.isActive) {
        filterQuery += `&filters[$and][4][isActive]=${query.isActive}`
    }
    return {
        filterQuery, countFilterQuery
    }
}

