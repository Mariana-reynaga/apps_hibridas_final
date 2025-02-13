import { React } from 'react';
import { Link } from 'react-router-dom'

import BigButton from '../../components/BigButton';
import H2Comp from '../../components/H2Comp';
import H1 from '../../components/H1Comp';
import AdminCard from '../../components/AdminCard';

function Admin(){
    return(
        <>
            <div className="flex justify-center">
                <div className="w-4/5">
                    <H1>Administración</H1>

                    <div className="mt-10 grid grid-cols-4 gap-x-3">
                        <AdminCard
                            title="Colores"
                            add="/colors/add"
                            destination="/colors"
                        />
                        <AdminCard
                            title="Largos"
                            add="/lengths/add"
                            destination="/lengths"
                        />
                        <AdminCard
                            title="Gatos"
                            add="/cats/add"
                            destination="/admin/cats/"
                        />
                        <div className="p-4 flex flex-col items-center border rounded-md">
                            <H2Comp>Usuarios</H2Comp>

                            <div className="w-full mt-5 flex justify-center">
                                <BigButton color="bg-teal-600">
                                    <Link to="/users">Ir</Link>
                                </BigButton>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        </>
    )
}

export default Admin;