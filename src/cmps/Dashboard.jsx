import { PieChart } from '@mui/x-charts/PieChart'

export function Dashboard({ toys }) {

    const pieData = toys.map((toy, index) => ({
        id: index,
        value: toy.price,
        label: toy.name
    }))

    return (
        <div>
            {console.log(toys)}
            <PieChart
                series={[
                    {
                        data: pieData
                    },
                ]}
                width={200}
                height={200}
            />
        </div>
    )
}