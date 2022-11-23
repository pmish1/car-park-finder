import {useState} from 'react'


const Result = ({result}) => {

    return (
        <>
            {result &&
                <div className='search_results'>
                    <h1>{result.facility_name}</h1>
                    <p>Total spots: {result.occupancy.total}/{result.spots}</p>

                    {result.zones.map(r => 
                        <p>
                            {r.zone_name} (ID:{r.zone_id}): {r.occupancy.total} of {r.spots} spots avaliable
                        </p>
                    )}

                </div>
            }

        </>
    )
}

export default Result