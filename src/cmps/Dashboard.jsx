import { PieChart } from '@mui/x-charts/PieChart'

export function Dashboard({ toys }) {
    // Aggregate price per label
    const pricePerLabel = {}
    toys.forEach(toy => {
        if (Array.isArray(toy.labels)) {
            toy.labels.forEach(label => {
                pricePerLabel[label] = (pricePerLabel[label] || 0) + toy.price
                console.log('Label:', label, 'Price:', toy.price)
            })
        }
    })

    // Format for PieChart
    const pieData = Object.entries(pricePerLabel).map(([label, price], idx) => ({
        id: idx,
        value: price,
        label,
    }))


    return (
        <div>
            <PieChart
                series={[
                    {
                        data: pieData
                    },
                ]}
                width={400}
                height={300}
            />
            
            <BarChart
                xAxis={[{ data: ['group A', 'group B', 'group C'] }]}
                series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                height={300}
            />
        </div>
    )


}