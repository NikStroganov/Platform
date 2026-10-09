package com.smartsearch.mapper;

import com.catalog.entity.CityEntity;
import com.catalog.entity.CompanyEntity;
import com.catalog.entity.CountryEntity;
import com.catalog.entity.ProfessionEntity;
import com.smartsearch.api.dto.rs.SearchResult;
import com.smartsearch.enums.CatalogType;
import org.springframework.stereotype.Component;

@Component
public class SearchResultMapper {

    public SearchResult fromCompany(CompanyEntity companyEntity) {
        return new SearchResult(
                companyEntity.getId(),
                CatalogType.COMPANY,
                companyEntity.getName()
        );
    }

    public SearchResult fromProfession(ProfessionEntity professionEntity) {
        return new SearchResult(
                professionEntity.getId(),
                CatalogType.PROFESSION,
                professionEntity.getName()
        );
    }

    public SearchResult fromCities(CityEntity cityEntity) {
        return new SearchResult(
                cityEntity.getId(),
                CatalogType.CITY,
                cityEntity.getName()
        );
    }

    public SearchResult fromCountries(CountryEntity countryEntity) {
        return new SearchResult(
                countryEntity.getId(),
                CatalogType.COUNTRY,
                countryEntity.getName()
        );
    }
}