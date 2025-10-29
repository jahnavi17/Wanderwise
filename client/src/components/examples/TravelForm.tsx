import TravelForm from '../TravelForm';

export default function TravelFormExample() {
  const handleSubmit = (preferences: any) => {
    console.log('Form submitted with preferences:', preferences);
  };

  return <TravelForm onSubmit={handleSubmit} />;
}
