import Button from './Button'
import { useLocation } from 'react-router-dom'

function Header({title, toggleTask, showAdd}) {
    const location = useLocation()

    return (
        <div>
            <header className='header'>
                <h1>{title}</h1>
                {location.pathname === '/' && (
                    <Button color={showAdd ? 'red' : 'green'}
                    text = {showAdd ? 'X' : 'Add Task'}
                    onClick = { toggleTask } />
                )}
            </header>
        </div>
    )
}
Header.defaultProps = {
    title: 'Tracker of Tasks'
}

export default Header
