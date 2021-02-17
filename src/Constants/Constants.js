// list all constants here
export const FETCH_METHOD = {
    POST: "POST",
    GET: "GET",
    PUT: "PUT",
    DELETE: "DELETE"
}

export const FETCH_HEADER = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

export const membership_levels = [
    { name: 'Select a level', value: '' },
    { name: 'Strategic Members', value: 'strategic' },
    { name: 'Contributing Members (formerly referred to as Solutions Members)', value: 'contributing' },
    { name: 'Associate Members', value: 'associate' },
    { name: 'Committer Members', value: 'committer' }
]