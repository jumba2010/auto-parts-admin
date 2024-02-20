import { formatMessage } from 'umi-plugin-react/locale';

export const categories = [
    { id: '01', name: formatMessage({ id: 'category.1' }) }, // Headlights & Lights
    { id: '02', name: formatMessage({ id: 'category.2' }) }, // Interior Parts
    { id: '03', name: formatMessage({ id: 'category.3' }) }, // Suspension
    { id: '04', name: formatMessage({ id: 'category.4' }) }, // Fuel Systems
    { id: '05', name: formatMessage({ id: 'category.5' }) }, // Air Filters
    { id: '06', name: formatMessage({ id: 'category.6' }) }, // Switches Relay
    { id: '07', name: formatMessage({ id: 'category.7' }) }, // Tires & Wheels
    { id: '08', name: formatMessage({ id: 'category.8' }) }, // Body Parts
    { id: '09', name: formatMessage({ id: 'category.9' }) }, // Transmission
    { id: '10', name: formatMessage({ id: 'category.10' }) } // Steering
  ];

export const subcategories = [
    { id: '101', name: formatMessage({ id: 'subcategory.1' }), categoryId: '01' }, // High Beam Lights
    { id: '102', name: formatMessage({ id: 'subcategory.2' }), categoryId: '01' }, // Low Beam Lights
    { id: '103', name: formatMessage({ id: 'subcategory.3' }), categoryId: '02' }, // Seats
    { id: '104', name: formatMessage({ id: 'subcategory.4' }), categoryId: '02' }, // Dashboard Accessories
    { id: '105', name: formatMessage({ id: 'subcategory.5' }), categoryId: '03' }, // Shock Absorbers
    { id: '106', name: formatMessage({ id: 'subcategory.6' }), categoryId: '03' }, // Springs
    { id: '107', name: formatMessage({ id: 'subcategory.7' }), categoryId: '04' }, // Fuel Injectors
    { id: '108', name: formatMessage({ id: 'subcategory.8' }), categoryId: '04' }, // Fuel Pumps
    { id: '109', name: formatMessage({ id: 'subcategory.9' }), categoryId: '05' }, // Air Intake Filters
    { id: '110', name: formatMessage({ id: 'subcategory.10' }), categoryId: '05' }, // Cabin Air Filters
    { id: '111', name: formatMessage({ id: 'subcategory.11' }), categoryId: '07' }, // Wheel Covers
    { id: '112', name: formatMessage({ id: 'subcategory.12' }), categoryId: '07' }, // Brake Kits
    { id: '113', name: formatMessage({ id: 'subcategory.13' }), categoryId: '07' }, // Tire Chains
    { id: '114', name: formatMessage({ id: 'subcategory.14' }), categoryId: '07' }, // Wheel Disks
    { id: '115', name: formatMessage({ id: 'subcategory.15' }), categoryId: '07' }, // Tires
    { id: '116', name: formatMessage({ id: 'subcategory.16' }), categoryId: '07' }, // Sensors
    { id: '117', name: formatMessage({ id: 'subcategory.17' }), categoryId: '07' }, // Accessories
    { id: '118', name: formatMessage({ id: 'subcategory.18' }), categoryId: '02' }, // Dashboards
    { id: '119', name: formatMessage({ id: 'subcategory.19' }), categoryId: '02' }, // Seat Covers
    { id: '120', name: formatMessage({ id: 'subcategory.20' }), categoryId: '02' }, // Floor Mats
    { id: '121', name: formatMessage({ id: 'subcategory.21' }), categoryId: '02' }, // Sun Shades
    { id: '122', name: formatMessage({ id: 'subcategory.22' }), categoryId: '02' }, // Visors
    { id: '123', name: formatMessage({ id: 'subcategory.23' }), categoryId: '02' }, // Car Covers
    { id: '124', name: formatMessage({ id: 'subcategory.24' }), categoryId: '02' }, // Accessories
    { id: '125', name: formatMessage({ id: 'subcategory.25' }), categoryId: '09' }, // Timing Belts
    { id: '126', name: formatMessage({ id: 'subcategory.26' }), categoryId: '09' }, // Spark Plugs
    { id: '127', name: formatMessage({ id: 'subcategory.27' }), categoryId: '09' }, // Oil Pans
    { id: '128', name: formatMessage({ id: 'subcategory.28' }), categoryId: '09' }, // Engine Gaskets
    { id: '129', name: formatMessage({ id: 'subcategory.29' }), categoryId: '09' }, // Oil Filters
    { id: '130', name: formatMessage({ id: 'subcategory.30' }), categoryId: '09' }, // Engine Mounts
    { id: '131', name: formatMessage({ id: 'subcategory.31' }), categoryId: '09' }, // Accessories
  
    // Potential subcategories for other categories
    { id: '132', name: formatMessage({ id: 'subcategory.32' }), categoryId: '01' }, // HID Bulbs
    { id: '133', name: formatMessage({ id: 'subcategory.33' }), categoryId: '01' }, // LED Lights
    { id: '134', name: formatMessage({ id: 'subcategory.34' }), categoryId: '01' }, // Fog Lights
    { id: '135', name: formatMessage({ id: 'subcategory.35' }), categoryId: '01' }, // Tail Lights
    { id: '136', name: formatMessage({ id: 'subcategory.36' }), categoryId: '03' }, // Shocks
    { id: '137', name: formatMessage({ id: 'subcategory.37' }), categoryId: '03' }, // Struts
    { id: '138', name: formatMessage({ id: 'subcategory.38' }), categoryId: '03' }, // Sway Bars
    { id: '139', name: formatMessage({ id: 'subcategory.39' }), categoryId: '03' }, // Bushings
    { id: '140', name: formatMessage({ id: 'subcategory.40' }), categoryId: '08' }, // Bumpers
    { id: '141', name: formatMessage({ id: 'subcategory.41' }), categoryId: '08' }, // Fenders
    { id: '142', name: formatMessage({ id: 'subcategory.42' }), categoryId: '08' }, // Mirrors
    { id: '143', name: formatMessage({ id: 'subcategory.43' }), categoryId: '08' }, // Hoods
    { id: '144', name: formatMessage({ id: 'subcategory.44' }), categoryId: '09' }, // Clutch Kits
    { id: '145', name: formatMessage({ id: 'subcategory.45' }), categoryId: '09' }, // Transmission Fluid
    { id: '146', name: formatMessage({ id: 'subcategory.46' }), categoryId: '09' }, // Shifters
    { id: '147', name: formatMessage({ id: 'subcategory.47' }), categoryId: '09' }, // Transmission Mounts
    { id: '148', name: formatMessage({ id: 'subcategory.48' }), categoryId: '10' }, // Power Steering Pumps
    { id: '149', name: formatMessage({ id: 'subcategory.49' }), categoryId: '10' }, // Steering Racks
    { id: '150', name: formatMessage({ id: 'subcategory.50' }), categoryId: '10' }, // Tie Rod Ends
    { id: '151', name: formatMessage({ id: 'subcategory.51' }), categoryId: '10' }, // Steering Wheels
    { id: '152', name: formatMessage({ id: 'subcategory.52' }), categoryId: '04' }, // Fuel Injectors
    { id: '153', name: formatMessage({ id: 'subcategory.53' }), categoryId: '04' }, // Fuel Pumps
    { id: '154', name: formatMessage({ id: 'subcategory.54' }), categoryId: '04' }, // Fuel Filters
    { id: '155', name: formatMessage({ id: 'subcategory.55' }), categoryId: '04' }, // Fuel Pressure Regulators
    { id: '156', name: formatMessage({ id: 'subcategory.56' }), categoryId: '06' }, // Ignition Switches
    { id: '157', name: formatMessage({ id: 'subcategory.57' }), categoryId: '06' }, // Relay Modules
    { id: '158', name: formatMessage({ id: 'subcategory.58' }), categoryId: '06' }, // Toggle Switches
    { id: '159', name: formatMessage({ id: 'subcategory.59' }), categoryId: '06' }  // Starter Solenoids
  ];
