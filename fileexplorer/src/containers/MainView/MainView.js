import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import EnhancedTable from '../../components/EnhancedTable/EnhancedTable';

class MainView extends Component {

    render() {
        return (
            <Aux>
                <EnhancedTable />
            </Aux>
        );
    }
}

export default MainView;
