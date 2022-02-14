import { render, screen, waitForElementToBeRemoved} from "@testing-library/react";
import WeatherInfo from "./WeatherInfo";
import { rest } from "msw";
import { setupServer } from "msw/node";


const server = setupServer(
    rest.get('https://api.openweathermap.org/data/2.5/weather?q=india&appid=0a9cb7f9907c0c31ed11b978e34341de', (req, res, ctx) => {
      return res(ctx.json({ WeatherInfo: [
          {
            temp : 24,
            detail : 'Humidity'
          }
      ] }))
    }),
  );

describe("Given Weather information", () => {
    beforeAll(() => {
      server.listen();
    });
   
    afterEach(() => {
      server.resetHandlers();
    });
  
    afterAll(() => {
      server.close();
    });

    test("When component mount THEN  India's Weather should mount",async () => {
        render(<WeatherInfo/>)
        await waitForElementToBeRemoved(() => screen.getAllByTestId("loading-information"))
        
        screen.getAllByTestId("Weather-information")
    })
})