import { useEffect, useRef, useState } from 'react';
import { NavLink as Link, useParams, useNavigate } from 'react-router-dom';

function Search () {
    const navigate = useNavigate();
    let { id } = useParams();
    const searchInput = useRef()

    function Proposal({proposal}) {
        const [voteData, setVoteData] = useState({})
        useEffect(() => {
            (async () => {
                let response = await fetch(process.env.REACT_APP_INDEXER_ENDPOINT + "/tx/vote_proposal/" + proposal.slice(1,proposal.length));
                const _voteData = await response.json();
                if(_voteData !== null) {
                    setVoteData({
                        'vote_id': _voteData['id'],
                        'vote': _voteData['vote'],
                        'voter': _voteData['voter'],
                        'txn_id': _voteData['tx_id'],
                        'delegations': _voteData['delegations']
                    })
                }
                
            })();
        },[])
        return (
            <div className='flex items-center justify-center h-[800px] space-x-5'>
                <div className='p-6 text-lg space-y-6 rounded-[15px] bg-[#1A1A1A] w-[1000px] h-[650px]'>
                    <div class='flex space-x-2'><div>Vote Id:</div> <div className='text-[#FFFF00]'>{voteData['vote_id']}</div></div>
                    <div class='flex space-x-2'><div>Vote:</div> <div className={`${voteData['vote'] === 'yay'? 'text-green-500' : 'text-red-500'}`}>{voteData['vote']}</div></div>
                    <div class='flex space-x-2'><div>Voter:</div> <div className='text-[#FFFF00]'>{voteData['voter']}</div></div>
                    <div class='flex space-x-2'><div>Txn Hash:</div> <button onClick={() => {navigate('/search/' + voteData['txn_id'])}} className='text-[#FFFF00] underline'>{voteData['txn_id']}</button></div>
                    <div class=''>
                        <div>Delegations:</div> 
                        <div className='space-y-2 max-h-[370px] overflow-y-scroll bg-black'>
                        {
                            voteData['delegations']?.map(addr => {
                                return (<div className='truncate text-[#FFFF00] py-2 px-4'>{addr}</div>)
                            })
                        }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function Hash({hash}) {
        const[txnData, setTxnData] = useState({})
        useEffect(() => {
            (async () => {
                let response = await fetch(process.env.REACT_APP_INDEXER_ENDPOINT + "/tx/" + hash);
                const _txnData = await response.json();
                if(_txnData !== null) {
                    response = await fetch(process.env.REACT_APP_INDEXER_ENDPOINT + "/block/hash/" + _txnData['block_id']);
                    const _blockData = await response.json();
                    if(_blockData !== null) {
                        setTxnData({
                            'chain_id': _blockData['header']['chain_id'],
                            'block_time': _blockData['header']['time'],
                            'block_height': _blockData['header']['height'],
                            'block_hash': _txnData['block_id'],
                            'txn_hash': _txnData['hash'],
                            "txn_type": _txnData["tx_type"],
                            "fee_amount_per_gas_unit": _txnData["fee_amount_per_gas_unit"],
                            "fee_token": _txnData["fee_token"],
                            "gas_limit_multiplier": _txnData["gas_limit_multiplier"],
                            "code": _txnData["code"],
                            "data": _txnData["data"],
                            'status': _txnData['return_code'] !== null ? 'Success' : 'Failed',
                            "tx": _txnData['tx']
                        })
                    }
                }
                
            })();
        },[])
        return (
            <div className='flex items-center justify-center h-[800px] space-x-6'>
                <div className='p-6 text-lg space-y-6 rounded-[15px] bg-[#1A1A1A] w-[1000px] h-[650px]'>
                    <div class='flex space-x-2'><div>Chain Id:</div> <div className='text-[#FFFF00]'>{txnData['chain_id']}</div></div>
                    <div class='flex space-x-2'><div>Block Height:</div> <button onClick={() => {navigate('/search/' + txnData['block_height'])}} className='text-[#FFFF00] underline'>{txnData['block_height']}</button></div>
                    <div class='flex space-x-2'><div>Status :</div> <div className={`${txnData['status'] === 'Success' ? 'text-green-500' : 'text-red-500'}`}>{txnData['status']}</div></div>
                    <div class='flex space-x-2'><div>Block Time:</div> <div className='text-[#FFFF00]'>{txnData['block_time']}</div></div>
                    <div class='flex space-x-2'><div>Block Hash:</div> <div className='text-[#FFFF00]'>{txnData['block_hash']}</div></div>
                    <div class='flex space-x-2'><div>Txn Hash:</div> <div className='text-[#FFFF00]'>{txnData['txn_hash']}</div></div>
                    <div class='flex space-x-2'><div>Txn Type:</div> <div className='text-[#FFFF00]'>{txnData['txn_type']}</div></div>
                    <div class='flex space-x-2'><div>Fee amount per gas unit:</div> <div className='text-[#FFFF00]'>{txnData['fee_amount_per_gas_unit']}</div></div>
                    <div class='flex space-x-2'><div>Fee Token:</div> <div className='text-[#FFFF00]'>{txnData['fee_token']}</div></div>
                    <div class='flex space-x-2'><div>Gas Limit Multiplier:</div> <div className='text-[#FFFF00]'>{txnData['gas_limit_multiplier']}</div></div>
                    <div class='flex space-x-2'><div>Code:</div> <div className='text-[#FFFF00]'>{txnData['code']}</div></div>
                    <div class='flex space-x-2'><div>Data:</div> <div className='truncate text-[#FFFF00]'>{txnData['data']}</div></div>
                </div>
            </div>
        )
    }

    function Height({height}) {
        const[blockData, setBlockData] = useState({})
        useEffect(() => {
            (async () => {
                const response = await fetch(process.env.REACT_APP_INDEXER_ENDPOINT + "/block/height/" + height);
                const _blockData = await response.json();
                if(_blockData !== null) {
                    setBlockData({
                        'block_height': _blockData['header']['height'],
                        'block_time': _blockData['header']['time'],
                        'chain_id': _blockData['header']['chain_id'],
                        'proposer': _blockData['header']['proposer_address'],
                        "txn_hash": _blockData["tx_hashes"],
                        "txn_size": _blockData["tx_hashes"].length,
                    })
                }
                
            })();
        },[])
        return (
            <div className='flex items-center justify-center h-[800px] space-x-6'>
                <div className='p-6 text-lg space-y-8 rounded-[15px] bg-[#1A1A1A] w-[700px] h-[330px]'>
                    <div class='flex space-x-2'><div>Chain Id:</div> <div className='text-[#FFFF00]'>{blockData['chain_id']}</div></div>
                    <div class='flex space-x-2'><div>Block Height:</div> <div className='text-[#FFFF00] underline'>{blockData['block_height']}</div></div>
                    <div class='flex space-x-2'><div>Block Time:</div> <div className='text-[#FFFF00]'>{blockData['block_time']}</div></div>
                    <div class='flex space-x-2'><div>Proposer:</div> <div className='text-[#FFFF00]'>{blockData['proposer']}</div></div>
                    <div class='flex space-x-2'><div>Txns Count:</div> <div className='text-[#FFFF00]'>{blockData['txn_size']}</div></div>
                </div>
                <div className='p-6 space-y-6 flex flex-col items-center rounded-[15px] bg-[#1A1A1A] w-[700px] h-[700px]'>
                    <div className='text-xl border-b-2 w-full text-center py-2 text-2xl'>Transactions</div>
                    <div className='space-y-4 overflow-y-scroll'>
                        {
                            blockData['txn_hash']?.map(txn => {
                                return (
                                    <div className='w-full text-[#FFFF00] bg-black p-4 px-6'>
                                        <button className='underline' onClick={() => {navigate('/search/' + txn['hash_id'])}}>{txn['hash_id']}</button>
                                    </div>
                                )
                            })
                        }
                    </div>
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
                        <input ref={searchInput} onChange={e => {searchInput.current = e.target.value}} type="text" id="voice-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search By Block / Txn Hash / Proposal Id (p0)" required />
                    </div>
                    <button onClick={() => {if(typeof(searchInput.current) !== 'object'){navigate('/search/' + searchInput.current)} }} type="submit" class="text-black inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-[#FFFF00] rounded-lg border border-[#FFFF00] focus:ring-4 focus:outline-none focus:ring-[#FFFF00] dark:bg-[#FFFF00] dark:hover:bg-[#FFFF00] dark:focus:ring-[#FFFF00]">
                        <div className='text-black'>Search</div>
                    </button>
                </form>
            </div>
            <div className='grow w-full'>
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