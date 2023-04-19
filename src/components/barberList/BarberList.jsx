import styles from "/styles/BarberList.module.css"
import Dropdown from 'react-bootstrap/Dropdown'

function BarberList() {
    
    return (
        <div className={styles.container}>
            <div className={styles.description}>
                
            </div>
        <Dropdown>
            <span className={styles.text}>Filter by barber: </span>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Choose a Barber
                </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
                <Dropdown.Item href="#/action-1">Staff Member (All)</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#/action-2">Elvert</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Jasmine</Dropdown.Item>
                <Dropdown.Item href="#/action-4">Jay</Dropdown.Item>
                <Dropdown.Item href="#/action-5">Sarah</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        </div>
    );
}

export default BarberList;
