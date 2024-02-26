import { useEffect, useRef, useState } from 'react';
import { NavLink as Link, useParams, useNavigate } from 'react-router-dom';

function Search () {
    const navigate = useNavigate();
    let { id } = useParams();
    const searchInput = useRef(id)

    function Proposal({proposal}) {
        return (
            <div>
            </div>
        )
    }

    function Hash({hash}) {
        // if(hash === inputId.current) {
        //     return 
        // } else {
        //     inputId.current = hash
        // }
        return (
            <div>
            </div>
        )
    }

    function Height({height}) {
        const[blockData, setBlockData] = useState({})
        console.log("herer??", height)
        // useEffect(() => {
        //     (async () => {
        //         const response = await fetch(process.env.REACT_APP_INDEXER_ENDPOINT + "/block/height/" + height);
        //         const _blockData = await response.json();
        //         console.log(_blockData)
        //         if(_blockData !== null) {
        //             console.log(_blockData)
        //             setBlockData({
        //                 'block_height': _blockData['last_commit']['height'],
        //                 'block_time': _blockData['header']['time'],
        //                 'chain_id': _blockData['header']['chain_id'],
        //                 'proposer': _blockData['header']['proposer_address'],
        //                 "txn_hash": _blockData["tx_hashes"],
        //                 "txn_size": _blockData["tx_hashes"].length,
        //             })
        //         }
                
        //     })();
        // },[])
        return (
            <div className='flex'>
                <div>dfdfdf</div>
                <div className='w-10 h-40 border'>
                    {height}
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 flex flex-col space-y-6 text-white items-center justify-center">
            <div className='w-full'>
                <form class="flex items-center max-w-lg mx-auto">   
                    <label for="voice-search" class="sr-only">Search</label>
                    <div class="relative w-full">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input ref={searchInput} onChange={e => {searchInput.current = e.target.value}} type="text" id="voice-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search By Block / Txn Hash / Block Hash / Proposal Id" required />
                    </div>
                    <button onClick={() => {if(typeof(searchInput.current) !== 'object'){navigate('/search/' + searchInput.current)} }} type="submit" class="text-black inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-[#FFFF00] rounded-lg border border-[#FFFF00] focus:ring-4 focus:outline-none focus:ring-[#FFFF00] dark:bg-[#FFFF00] dark:hover:bg-[#FFFF00] dark:focus:ring-[#FFFF00]">
                        Search
                    </button>
                </form>
            </div>
            <div className='grow border w-full'>
                {
                    id !== undefined ? 
                        isNaN(id) ?
                            (id.slice(0,1) === 'p' && !isNaN(id.slice(1,id.length))) ?
                                <Proposal proposal={id}/> : <Hash hash={id}/> : <div><Height height={id}/></div> : ''
                }
            </div>
        </div>
    )
}

export default Search;