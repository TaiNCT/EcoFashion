﻿using EcoFashionBackEnd.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

[Table("DesignsMaterials")]
public class DesignsMaterial
{
    [Key, Column(Order = 0)]
    public int DesignId { get; set; }

    [Key, Column(Order = 1)]
    public int MaterialId { get; set; }

    [ForeignKey("DesignId")]
    public virtual Design Designs { get; set; }

    [ForeignKey("MaterialId")]
    public virtual Material Materials { get; set; }

    public float PersentageUsed { get; set; }
    public int MeterUsed { get; set; }
}
