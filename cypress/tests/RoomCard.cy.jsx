import RoomCard from '../../src/components/MainPage/RoomCard.jsx';
import { MemoryRouter } from "react-router-dom";

describe('<RoomCard />', () => {
  const room = {
    id: 1,
    name: 'Room 1',
    location: 'S105',
    price: 1000,
    image: 'https://a.allegroimg.com/original/11ae3f/fb0875dc40dfb4d65fc8add1cd0b/Fototapeta-AUTORSKA-Obraz-Divky-400x200'
  };

  it('renders the room details correctly', () => {
    cy.mount(
        <MemoryRouter>
          <RoomCard room={room} />
        </MemoryRouter>
    );

    // Check if the image is rendered correctly
    cy.get('img').should('have.attr', 'src', room.image).and('have.attr', 'alt', room.name);

    // Check the room name
    cy.contains(room.name).should('be.visible');

    // Check the location
    cy.contains(room.location).should('be.visible');

    // Check the price
    cy.contains(`${room.price} CZK / night`).should('be.visible');

    // Check if the "Book Now" button is rendered and links correctly
    cy.get('a').should('have.attr', 'href', `/room/${room.id}`).and('contain.text', 'Book Now');
  });

  it('throws an error when room is null', () => {
    cy.on('uncaught:exception', (err) => {
      expect(err.message).to.include('Room object is required!');
      return false; // Prevent Cypress from failing the test on the uncaught exception
    });

    cy.mount(
        <MemoryRouter>
          <RoomCard room={null} />
        </MemoryRouter>
    );
  });
});