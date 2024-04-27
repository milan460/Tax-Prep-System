package com.example.taxprepsystem.taxprepsystem.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "constants")
public class Constants {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "dependents_constant")
    private Double dependentsConstant;

    @Column(name = "single_status")
    private Double singleStatus;

    @Column(name = "married_status")
    private Double marriedStatus;

    @Column(name = "tax_bracket_1")
    private Double taxBracket1;

    @Column(name = "tax_bracket_2")
    private Double taxBracket2;

    @Column(name = "tax_bracket_3")
    private Double taxBracket3;

    @Column(name = "tax_bracket_4")
    private Double taxBracket4;

    @Column(name = "tax_bracket_5")
    private Double taxBracket5;

    @Column(name = "tax_bracket_6")
    private Double taxBracket6;

    @Column(name = "tax_bracket_7")
    private Double taxBracket7;

    public Constants() {
    }

    public Constants(Double dependentsConstant, Double singleStatus, Double marriedStatus, Double taxBracket1,
            Double taxBracket2, Double taxBracket3, Double taxBracket4, Double taxBracket5, Double taxBracket6,
            Double taxBracket7) {
        this.dependentsConstant = dependentsConstant;
        this.singleStatus = singleStatus;
        this.marriedStatus = marriedStatus;
        this.taxBracket1 = taxBracket1;
        this.taxBracket2 = taxBracket2;
        this.taxBracket3 = taxBracket3;
        this.taxBracket4 = taxBracket4;
        this.taxBracket5 = taxBracket5;
        this.taxBracket6 = taxBracket6;
        this.taxBracket7 = taxBracket7;
    }

    public Constants(int id, Double dependentsConstant, Double singleStatus, Double marriedStatus, Double taxBracket1,
            Double taxBracket2, Double taxBracket3, Double taxBracket4, Double taxBracket5, Double taxBracket6,
            Double taxBracket7) {
        this.id = id;
        this.dependentsConstant = dependentsConstant;
        this.singleStatus = singleStatus;
        this.marriedStatus = marriedStatus;
        this.taxBracket1 = taxBracket1;
        this.taxBracket2 = taxBracket2;
        this.taxBracket3 = taxBracket3;
        this.taxBracket4 = taxBracket4;
        this.taxBracket5 = taxBracket5;
        this.taxBracket6 = taxBracket6;
        this.taxBracket7 = taxBracket7;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Double getDependentsConstant() {
        return dependentsConstant;
    }

    public void setDependentsConstant(Double dependentsConstant) {
        this.dependentsConstant = dependentsConstant;
    }

    public Double getSingleStatus() {
        return singleStatus;
    }

    public void setSingleStatus(Double singleStatus) {
        this.singleStatus = singleStatus;
    }

    public Double getMarriedStatus() {
        return marriedStatus;
    }

    public void setMarriedStatus(Double marriedStatus) {
        this.marriedStatus = marriedStatus;
    }

    public Double getTaxBracket1() {
        return taxBracket1;
    }

    public void setTaxBracket1(Double taxBracket1) {
        this.taxBracket1 = taxBracket1;
    }

    public Double getTaxBracket2() {
        return taxBracket2;
    }

    public void setTaxBracket2(Double taxBracket2) {
        this.taxBracket2 = taxBracket2;
    }

    public Double getTaxBracket3() {
        return taxBracket3;
    }

    public void setTaxBracket3(Double taxBracket3) {
        this.taxBracket3 = taxBracket3;
    }

    public Double getTaxBracket4() {
        return taxBracket4;
    }

    public void setTaxBracket4(Double taxBracket4) {
        this.taxBracket4 = taxBracket4;
    }

    public Double getTaxBracket5() {
        return taxBracket5;
    }

    public void setTaxBracket5(Double taxBracket5) {
        this.taxBracket5 = taxBracket5;
    }

    public Double getTaxBracket6() {
        return taxBracket6;
    }

    public void setTaxBracket6(Double taxBracket6) {
        this.taxBracket6 = taxBracket6;
    }

    public Double getTaxBracket7() {
        return taxBracket7;
    }

    public void setTaxBracket7(Double taxBracket7) {
        this.taxBracket7 = taxBracket7;
    }

    @Override
    public String toString() {
        return "Constants [id=" + id + ", dependentsConstant=" + dependentsConstant + ", singleStatus=" + singleStatus
                + ", marriedStatus=" + marriedStatus + ", taxBracket1=" + taxBracket1 + ", taxBracket2=" + taxBracket2
                + ", taxBracket3=" + taxBracket3 + ", taxBracket4=" + taxBracket4 + ", taxBracket5=" + taxBracket5
                + ", taxBracket6=" + taxBracket6 + ", taxBracket7=" + taxBracket7 + ", getClass()=" + getClass()
                + ", getId()=" + getId() + ", getDependentsConstant()=" + getDependentsConstant()
                + ", getSingleStatus()=" + getSingleStatus() + ", getMarriedStatus()=" + getMarriedStatus()
                + ", hashCode()=" + hashCode() + ", getTaxBracket1()=" + getTaxBracket1() + ", getTaxBracket2()="
                + getTaxBracket2() + ", getTaxBracket3()=" + getTaxBracket3() + ", getTaxBracket4()=" + getTaxBracket4()
                + ", getTaxBracket5()=" + getTaxBracket5() + ", getTaxBracket6()=" + getTaxBracket6()
                + ", getTaxBracket7()=" + getTaxBracket7() + ", toString()=" + super.toString() + "]";
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + id;
        result = prime * result + ((dependentsConstant == null) ? 0 : dependentsConstant.hashCode());
        result = prime * result + ((singleStatus == null) ? 0 : singleStatus.hashCode());
        result = prime * result + ((marriedStatus == null) ? 0 : marriedStatus.hashCode());
        result = prime * result + ((taxBracket1 == null) ? 0 : taxBracket1.hashCode());
        result = prime * result + ((taxBracket2 == null) ? 0 : taxBracket2.hashCode());
        result = prime * result + ((taxBracket3 == null) ? 0 : taxBracket3.hashCode());
        result = prime * result + ((taxBracket4 == null) ? 0 : taxBracket4.hashCode());
        result = prime * result + ((taxBracket5 == null) ? 0 : taxBracket5.hashCode());
        result = prime * result + ((taxBracket6 == null) ? 0 : taxBracket6.hashCode());
        result = prime * result + ((taxBracket7 == null) ? 0 : taxBracket7.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Constants other = (Constants) obj;
        if (id != other.id)
            return false;
        if (dependentsConstant == null) {
            if (other.dependentsConstant != null)
                return false;
        } else if (!dependentsConstant.equals(other.dependentsConstant))
            return false;
        if (singleStatus == null) {
            if (other.singleStatus != null)
                return false;
        } else if (!singleStatus.equals(other.singleStatus))
            return false;
        if (marriedStatus == null) {
            if (other.marriedStatus != null)
                return false;
        } else if (!marriedStatus.equals(other.marriedStatus))
            return false;
        if (taxBracket1 == null) {
            if (other.taxBracket1 != null)
                return false;
        } else if (!taxBracket1.equals(other.taxBracket1))
            return false;
        if (taxBracket2 == null) {
            if (other.taxBracket2 != null)
                return false;
        } else if (!taxBracket2.equals(other.taxBracket2))
            return false;
        if (taxBracket3 == null) {
            if (other.taxBracket3 != null)
                return false;
        } else if (!taxBracket3.equals(other.taxBracket3))
            return false;
        if (taxBracket4 == null) {
            if (other.taxBracket4 != null)
                return false;
        } else if (!taxBracket4.equals(other.taxBracket4))
            return false;
        if (taxBracket5 == null) {
            if (other.taxBracket5 != null)
                return false;
        } else if (!taxBracket5.equals(other.taxBracket5))
            return false;
        if (taxBracket6 == null) {
            if (other.taxBracket6 != null)
                return false;
        } else if (!taxBracket6.equals(other.taxBracket6))
            return false;
        if (taxBracket7 == null) {
            if (other.taxBracket7 != null)
                return false;
        } else if (!taxBracket7.equals(other.taxBracket7))
            return false;
        return true;
    }

    
    
    
}
