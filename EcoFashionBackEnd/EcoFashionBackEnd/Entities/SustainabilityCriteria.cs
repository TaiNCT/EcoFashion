﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("Sustainability_Criteria")]
    public class SustainabilityCriteria
    {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
        public int CriterionId { get; set; }

        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Unit { get; set; }
    }
    
}