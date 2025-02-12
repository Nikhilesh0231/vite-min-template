import { Table } from '@mantine/core';
import Data from '../Assets/Manufac _ India Agro Dataset.json';
import './DataTable.css';

// Define TypeScript interface for crop data
interface CropData {
  Country: string;
  Year: string;
  "Crop Name": string;
 "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number | string;
  "Crop Production (UOM:t(Tonnes))": number | string;
  "Area Under Cultivation (UOM:Ha(Hectares))": number | string;
}

// Ensure data is an array of CropData
const cropsData: CropData[] = Data;

// Function to group data by year and find highest/lowest yielding crops
const processDataByYear = (data: CropData[] |null) => {
  // Group crops by year
  const groupedByYear: { [key: string]: CropData[] } = {};
  if(data)
  data.forEach(crop => {
    if (!groupedByYear[crop.Year]) {
      groupedByYear[crop.Year] = [];
    }
    groupedByYear[crop.Year].push(crop);
  });

  // Process each year to find highest and lowest yielding crops
  const processedData = Object.entries(groupedByYear).map(([year, crops]) => {
    // Filter out crops with missing yield data
    const validCrops = crops.filter(crop => 
      crop["Crop Production (UOM:t(Tonnes))"] !== "" &&
      !isNaN(Number(crop["Crop Production (UOM:t(Tonnes))"]))
    );

    if (validCrops.length === 0) return null; // Skip years with no valid data

    // Find highest and lowest yielding crops
    const maxYield = Math.max(...validCrops.map(crop => Number(crop["Crop Production (UOM:t(Tonnes))"])));
    const minYield = Math.min(...validCrops.map(crop => Number(crop["Crop Production (UOM:t(Tonnes))"])));

    const highestYieldingCrop = validCrops.find(crop => Number(crop["Crop Production (UOM:t(Tonnes))"]) === maxYield);
    const lowestYieldingCrop = validCrops.find(crop => Number(crop["Crop Production (UOM:t(Tonnes))"]) === minYield);

    return {
      year,
      highestYieldingCrop: highestYieldingCrop ? highestYieldingCrop["Crop Name"] : "N/A",
      lowestYieldingCrop: lowestYieldingCrop ? lowestYieldingCrop["Crop Name"] : "N/A",
    };
  }).filter(Boolean); // Remove null values

  return processedData;
};

const processedCrops = processDataByYear(cropsData);

function DataTable() {
  return (
  <div className='main'>
    <div className='table'>
      <Table verticalSpacing="md"> 
        <Table.Thead>
          <Table.Tr >
            <Table.Th>Year</Table.Th>
            <Table.Th>Crop with Maximum
            Production in that Year</Table.Th>
            <Table.Th>Crop with Minimum
            Production in that Year</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          
          {processedCrops.map((data, index) => (
            <Table.Tr key={index}>
                <Table.Td>{data?.year??'0'}</Table.Td>
              <Table.Td>{data?.highestYieldingCrop??'0'}</Table.Td>
              <Table.Td>{data?.lowestYieldingCrop??'0'}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
  
    </div>
    </div>
  );

}

export default DataTable;
