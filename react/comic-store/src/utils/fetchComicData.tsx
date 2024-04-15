import Comic from "../interfaces/Comic"

export default async function fetchComicData():Promise<Comic[]>{
    const publicKey:string = process.env.PUBLIC_KEY || ''
    const hash:string = process.env.HASH_KEY || ''
    const ts:string = '1'
    console.log(hash)

    if (!publicKey || !hash) {
        console.log(hash)
        console.error('Missing environment variables for authentication');
        return [];
    }

    try {
        const res = await fetch(`http://gateway.marvel.com/v1/public/comics?dateDescriptor=thisMonth&limit=100&ts=${ts}&apikey=${publicKey}&hash=${hash}`) 
        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.status} - ${res.statusText}`);
        }
        const data = await res.json()
        return data.data.results;
        
    } catch (error) {
        console.log(error)
        return []
        
    }
}