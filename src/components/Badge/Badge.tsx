import { Status } from '../../utils/status';

const Badge = ({ status }: { status?: `${Status}` }) => {
    if (!status) return null;
    return (
        <>
            {status === Status.ONLINE && <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full" />
            }
            {status === Status.BUSY && <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-red-400 border-2 border-white dark:border-gray-800 rounded-full" />
            }
            {status === Status.DO_NOT_DISTURB && <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-orange-400 border-2 border-white dark:border-gray-800 rounded-full" />
            }
            {status === Status.OFFLINE && <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-blue-400 border-2 border-white dark:border-gray-800 rounded-full" />
            }
        </>
    )
}

export default Badge