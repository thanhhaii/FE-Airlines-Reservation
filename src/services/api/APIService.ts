import { TokenInfo } from "src/models/TokenInfo"
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import {
  AirportRequest,
  BaseResult,
  GetPagingResponse,
  LoginRequest,
} from "./models"
import { User, UserRegister, AirlineResult, Airline, City } from "src/models"
import { Airport } from "src/models/Airport"
import {
  FindFlightRequest,
  FindFlightResponse,
  FlightCreate,
  FlightDetailAll,
} from "src/models/Flight"
import { PlaneCreate, PlaneDetail, PlaneSelected } from "src/models/Plane"
import {
  MyTicketDetail,
  OrderComplete,
  TicketDetailAll,
  Tickets,
} from "src/models/Ticket"

export class APIService {
  constructor(private _axios: AxiosInstance) {
    this._axios.interceptors.request.use(
      async (cfg): Promise<AxiosRequestConfig> => {
        const token = sessionStorage.getItem("token")
        if (token) {
          cfg.headers["Authorization"] = "Bearer " + token
        }
        return cfg
      },
    )
  }

  public async login(request: LoginRequest): Promise<boolean> {
    const resp = await this._axios.post<TokenInfo>("/Auth/login", request, {
      validateStatus: (status: number) => status === 200 || status === 401,
    })

    if (resp.status === 200) {
      sessionStorage.setItem("token", resp.data.token)
      return true
    }

    return false
  }

  public async register(request: UserRegister): Promise<BaseResult> {
    const resp = await this._axios.post<BaseResult>("/Auth/register", request, {
      validateStatus: (status: number) => status === 201 || status === 400,
    })
    return resp.data
  }

  public async currentUser(): Promise<User> {
    const resp = await this._axios.get<User>("/Auth/me", {
      validateStatus: (status: number) => status === 200,
    })
    return resp.data
  }

  public async getAirline(): Promise<AirlineResult> {
    const resp = await this._axios.get<AirlineResult>("/Airline", {
      validateStatus: (status: number) => status === 200,
    })
    return resp.data
  }

  public async createAirline(airlineName: string): Promise<AxiosResponse> {
    const resp = await this._axios.post<Airline>(
      "/Airline",
      {
        airlineName: airlineName,
        airlineId: 0,
      },
      {
        validateStatus: (status: number) => status === 201,
      },
    )
    return resp
  }

  public async updateAirline(value: Airline): Promise<AxiosResponse> {
    const resp = await this._axios.put<Airline>(
      `/Airline/${value.airlineId}`,
      value,
      {
        validateStatus: (status: number) => status === 200,
      },
    )
    return resp
  }

  public async getCity(
    keyword: string,
    pageIndex: number,
    pageSize: number,
  ): Promise<GetPagingResponse<City>> {
    const resp = await this._axios.get<GetPagingResponse<City>>(
      `/City?Keyword=${keyword}&PageIndex=${pageIndex}&PageSize=${pageSize}`,
      {
        validateStatus: (status: number) => status === 200,
      },
    )
    return resp.data
  }

  public async createCity(city: City): Promise<AxiosResponse> {
    const resp = await this._axios.post<AxiosResponse>("/City", city, {
      validateStatus: (status: number) => status === 201,
    })
    return resp
  }

  public async updateCity(city: City): Promise<AxiosResponse> {
    const resp = await this._axios.put<AxiosResponse>(
      "/City?id=" + city.id,
      city,
      {
        validateStatus: (status: number) => status === 200,
      },
    )
    return resp
  }

  public async getAllAirport(): Promise<Airport[]> {
    const resp = await this._axios.get<Airport[]>("/Airport/getAll", {
      validateStatus: (status: number) => status === 200,
    })
    return resp.data
  }

  public async getAirport(
    keyword: string,
    pageIndex: number,
    pageSize: number,
  ): Promise<GetPagingResponse<Airport>> {
    const resp = await this._axios.get<GetPagingResponse<Airport>>(
      `/Airport?Keyword=${keyword}&PageIndex=${pageIndex}&PageSize=${pageSize}`,
      {
        validateStatus: (status: number) => status === 200,
      },
    )
    return resp.data
  }

  public async createAirport(request: AirportRequest): Promise<AxiosResponse> {
    const resp = await this._axios.post<AxiosResponse>("/Airport", request, {
      validateStatus: (status: number) => status === 201,
    })
    return resp
  }

  public async updateAirport(
    airportId: number,
    request: AirportRequest,
  ): Promise<AxiosResponse> {
    const resp = await this._axios.put<AxiosResponse>(
      "/Airport/" + airportId,
      request,
      {
        validateStatus: (status: number) => status === 200,
      },
    )
    return resp
  }

  public async findFligt(
    request: FindFlightRequest,
  ): Promise<GetPagingResponse<FindFlightResponse>> {
    const resp = await this._axios.get<GetPagingResponse<FindFlightResponse>>(
      `/Flight?FlyingFrom=${request.flyingFrom}&FlyingTo=${request.flyingTo}&Departing=${request.departing}&Returning=${request.returning}&Adults=${request.adults}&Children=${request.children}&Baby=${request.baby}&TicketType=${request.ticketType}`,
      { validateStatus: (status: number) => status === 200 },
    )
    return resp.data
  }

  public async createFlight(value: FlightCreate): Promise<AxiosResponse> {
    const resp = await this._axios.post<AxiosResponse>("/Flight", value, {
      validateStatus: (status: number) => status === 201,
    })
    return resp
  }

  public async getListFlight(
    pageSize: number,
    currentPage: number,
  ): Promise<GetPagingResponse<FindFlightResponse>> {
    const resp = await this._axios.get<GetPagingResponse<FindFlightResponse>>(
      `/Flight/get-flight-paging?PageIndex=${currentPage}&PageSize=${pageSize}`,
      {
        validateStatus: (status: number) => status === 200,
      },
    )
    return resp.data
  }

  public async getFlightDetailAll(id: string): Promise<FlightDetailAll> {
    const resp = await this._axios.get<FlightDetailAll>(`/Flight/${id}`, {
      validateStatus: (status: number) => status === 200,
    })
    return resp.data
  }

  public async getPlaneSelected(): Promise<PlaneSelected[]> {
    const resp = await this._axios.get<PlaneSelected[]>("/Plane/getAll", {
      validateStatus: (status: number) => status === 200,
    })
    return resp.data
  }

  public async getPlanePaging(
    pageSize: number,
    pageIndex: number,
  ): Promise<GetPagingResponse<PlaneDetail>> {
    const resp = await this._axios.get<GetPagingResponse<PlaneDetail>>(
      `/Plane?PageIndex=${pageIndex}&PageSize=${pageSize}`,
      { validateStatus: (status: number) => status === 200 },
    )
    return resp.data
  }

  public async createPlane(value: PlaneCreate): Promise<AxiosResponse> {
    const resp = await this._axios.post<AxiosResponse>("/Plane", value, {
      validateStatus: (status: number) => status === 201,
    })
    return resp
  }

  public async createTicket(value: Tickets): Promise<AxiosResponse<string>> {
    const resp = await this._axios.post<string>("/Ticket", value, {
      validateStatus: (status: number) => status === 201,
    })
    return resp
  }

  public async getFlightByTicket(value: string): Promise<OrderComplete> {
    const resp = await this._axios.get<OrderComplete>(`/Ticket/${value}`, {
      validateStatus: (status: number) => status === 200,
    })
    return resp.data
  }

  public async getMyTicket(value: string): Promise<MyTicketDetail[]> {
    const resp = await this._axios.get<MyTicketDetail[]>(
      `/Ticket/myTicket/${value}`,
      {
        validateStatus: (status: number) => status === 200,
      },
    )
    return resp.data
  }

  public async getTicketDetailAll(value: string): Promise<TicketDetailAll> {
    const resp = await this._axios.get<TicketDetailAll>(
      `/Ticket/myTicketAll/${value}`,
      {
        validateStatus: (status: number) => status === 200,
      },
    )
    return resp.data
  }
}
